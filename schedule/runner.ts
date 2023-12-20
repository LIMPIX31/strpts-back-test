import { CronJob }               from 'cron'

import { TaskHistoryRepository } from '@service/repository'
import { TaskLockRepository }    from '@service/repository'
import { TaskStateRepository }   from '@service/repository'
import { TaskWorkerRepository }  from '@service/repository'

interface Job {
	id: string
	cron: string
	execute: () => Promise<void>
}

let instanceLoad = 0

const sync = {
	locked: false,
	resolvers: [] as Array<() => void>,
	async lock() {
		await new Promise<void>((resolve) => {
			if (!this.locked) {
				resolve()
				return
			}

			this.resolvers.push(resolve)
		})

		this.locked = true
	},
	unlock() {
		if (this.locked) {
			this.locked = false
			if (this.resolvers.length > 0) {
				const nextResolve = this.resolvers.shift()
				nextResolve?.()
			}
		}
	},
}

const serviceId = process.env.SERVICE_ID!

function run({ id, execute }: Job) {
	return async () => {
		await sync.lock()

		{
			const result = await TaskWorkerRepository.take(serviceId, instanceLoad)

			if (!result) {
				console.log('Task X is ceded to another instance')
				sync.unlock()
				return
			}
		}

		{
			const result = await TaskLockRepository.takeLock(id)

			if (!result) {
				console.log(`Unable to start task "${id}". Another instance is holding a lock`)
				await TaskWorkerRepository.free(serviceId)
				sync.unlock()
				return
			}
		}

		instanceLoad += 1
		sync.unlock()

		await TaskStateRepository.setRunning(id, serviceId)

		console.log(`Task "${id}" started`)
		const start = performance.now()
		try {
			await execute()
			console.log(`Task "${id}" completed`)
		} catch {
			console.log(`Task "${id}" failed with exception`)
		}
		const duration = performance.now() - start

		await TaskHistoryRepository.push(id, Math.floor(duration))

		instanceLoad -= 1
		await TaskWorkerRepository.free(serviceId)
		await TaskStateRepository.initializeTask(id)
		await TaskLockRepository.freeLock(id)
	}
}

export function schedule(job: Job) {
	console.log(`Job "${job.id}" scheduled`)

	return CronJob.from({
		cronTime: job.cron,
		onTick: run(job),
		start: true,
	})
}
