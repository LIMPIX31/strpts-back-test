import { Op }         from 'sequelize'

import { User }       from '@service/repository'
import { BadRequest } from '@shared/exceptions'
import { NotFound }   from '@shared/exceptions'

export async function change(userId: string, amount: number) {
	{
		const user = await User.findByPk(userId)

		if (!user) {
			throw new NotFound()
		}
	}

	const [[rows, count]]: any = await User.increment('balance', {
		by: amount,
		where: {
			id: userId,
			balance: {
				[Op.gte]: amount > 0 ? 0 : -amount,
			},
		},
	})

	if (!count || count === 0) {
		throw new BadRequest('Insufficient funds in the account')
	}

	const [{ balance }] = rows

	return balance
}
