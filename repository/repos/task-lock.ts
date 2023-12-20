import { TaskLock } from '../models/task-lock.ts'

export async function takeLock(taskId: string) {
	const [, success] = await TaskLock.findOrCreate({
		lock: true,
		where: {
			id: taskId,
		},
	})

	return success
}

export async function freeLock(taskId: string) {
	await TaskLock.destroy({
		where: {
			id: taskId,
		},
	})
}

export async function clean() {
	await TaskLock.truncate()
}
