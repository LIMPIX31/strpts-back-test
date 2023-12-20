import { TaskLockRepository }  from '@service/repository'
import { TaskStateRepository } from '@service/repository'

import * as jobs               from './jobs/mod.ts'
import { schedule }            from './runner.ts'

export * from './runner.ts'
export * from './jobs/mod.ts'

export async function scheduleAllJobs() {
	await TaskLockRepository.clean()
	await Promise.all(
		Object.values(jobs).map(async (job) => {
			await TaskStateRepository.initializeTask(job.id)
			schedule(job)
		}),
	)
}
