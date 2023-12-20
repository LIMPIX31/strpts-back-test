import { CronJob }               from 'cron'

import { TaskLockRepository }    from '@service/repository'
import { TaskStateRepository }   from '@service/repository'
import { TaskHistoryRepository } from '@service/repository'

interface Job {
	id: string
	cron: string
	execute: () => Promise<void>
}

function run({ id, execute }: Job) {
	return async () => {
		const result = await TaskLockRepository.takeLock(id)

		if (!result) {
			console.log(`Unable to start task "${id}". Another instance is holding a lock`)
			return
		}

		await TaskStateRepository.setRunning(id, process.env.SERVICE_ID!)

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
