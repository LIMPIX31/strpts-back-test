import type { WhereOptions } from 'sequelize'
import      { Op }           from 'sequelize'

import      { User }         from '../models/user.ts'

export async function updateBalanceById(id: string, amount: number): Promise<User | undefined> {
	const where: WhereOptions = { id }

	if (amount < 0) {
		where.balance = {
			[Op.gte]: -amount,
		}
	}

	const [[rows]]: any = await User.increment('balance', {
		by: amount,
		where,
	})

	return rows?.at(0)
}
