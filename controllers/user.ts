import { z }                  from 'zod'

import { userBalanceService } from '@service/services'
import { app }                from '@shared/app'
import { validate }           from '@shared/validation'

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

app.put('/:userId/balance', validate(RequestSchema), async (req, res) => {
	const { userId } = req.params as Params
	const { amount } = req.body as Body

	const balance = await userBalanceService.change(userId, amount)

	res.json({
		success: true,
		balance,
	})
})
