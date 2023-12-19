import { UserRepository } from '@service/repository'
import { BadRequest }     from '@shared/exceptions'

export async function change(userId: string, amount: number) {
	const changedUser = await UserRepository.updateBalanceById(userId, amount)

	if (!changedUser) {
		throw new BadRequest('User is not found or has insufficient funds')
	}

	return changedUser.balance
}
