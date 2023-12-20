import { TaskState } from '@service/repository'

export async function initializeTask(taskId: string) {
	const [task] = await TaskState.findOrCreate({
		where: {
			id: taskId,
		},
		defaults: {
			state: 'pending',
		},
	})

	if (task.state !== 'pending') {
		task.state = 'pending'
		task.service_id = null
		task.startedAt = null
		await task.save()
	}
}

export async function setRunning(taskId: string, serviceId: string) {
	await TaskState.update(
		{
			state: 'running',
			service_id: serviceId,
			startedAt: new Date(),
		},
		{
			where: {
				id: taskId,
			},
		},
	)
}

export async function getAll() {
	return TaskState.findAll()
}
