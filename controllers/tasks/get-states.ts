import type { Request }      from 'express'
import type { Response }     from 'express'

import      { tasksService } from '@service/services'

export default [
	async (_: Request, res: Response) => {
		const states = await tasksService.getStates()

		res.json(
			states.map((it) => ({
				id: it.id,
				serviceId: it.service_id ?? undefined,
				duration: it.startedAt ? Date.now() - new Date(it.startedAt).getTime() : undefined,
				state: it.state,
			})),
		)
	},
]
