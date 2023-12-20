import { nanoid }      from 'nanoid'

import { TaskHistory } from '@service/repository'

export async function push(taskId: string, duration: number) {
	const id = nanoid(8)

	await TaskHistory.create({
		id,
		taskId,
		duration,
	})
}
