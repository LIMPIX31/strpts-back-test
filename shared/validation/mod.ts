import type { NextFunction } from 'express'
import type { Request }      from 'express'
import type { Response }     from 'express'
import type { Schema }       from 'zod'

export function validate(schema: Schema) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const result = await schema.safeParseAsync({
			body: req.body,
			query: req.query,
			params: req.params,
		})

		if (!result.success) {
			return res.status(400).json({
				error: result.error.issues.map(({ path, message }) => `${path.join('.')}: ${message}`),
			})
		}

		next()
	}
}
