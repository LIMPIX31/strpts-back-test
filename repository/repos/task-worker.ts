import { col }        from 'sequelize'
import { fn }         from 'sequelize'

import { connection } from '../connection.ts'
import { TaskWorker } from '../models/task-worker.ts'

export async function attach(serviceId: string) {
	const [worker] = await TaskWorker.findOrCreate({
		where: {
			id: serviceId,
		},
		defaults: {
			load: 0,
		},
	})

	if (worker.load !== 0) {
		worker.load = 0
		await worker.save()
	}
}

export async function free(serviceId: string) {
	await TaskWorker.decrement('load', {
		by: 1,
		where: {
			id: serviceId,
		},
	})
}

export async function take(serviceId: string, threshold: number) {
	return connection.transaction(async (transaction) => {
		const [result] = await TaskWorker.findAll({
			transaction,
			attributes: [[fn('AVG', col('load')), 'avg']],
			raw: true,
		})

		const avg = Reflect.get(result, 'avg') as number

		if (threshold <= avg) {
			await TaskWorker.increment('load', {
				by: 1,
				transaction,
				where: {
					id: serviceId,
				},
			})

			return true
		}

		return false
	})
}
