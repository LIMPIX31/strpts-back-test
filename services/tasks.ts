import { TaskStateRepository } from '@service/repository'

export async function getStates() {
	return TaskStateRepository.getAll()
}
