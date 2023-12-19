import type { Request }            from 'express'
import type { Response }           from 'express'
import      { z }                  from 'zod'

import      { userBalanceService } from '@service/services'
import      { validate }           from '@shared/validation'

const RequestSchema = z.object({
	params: z.object({
		userId: z.string(),
	}),
	body: z.object({
		amount: z.number(),
	}),
})

type RequestSchema = z.infer<typeof RequestSchema>
type Params = RequestSchema['params']
type Body = RequestSchema['body']

export default [
	validate(RequestSchema),
	async (req: Request, res: Response) => {
		const { userId } = req.params as Params
		const { amount } = req.body as Body

		const balance = await userBalanceService.change(userId, amount)

		res.json({
			success: true,
			balance,
		})
	},
]
