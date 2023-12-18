import type { NextFunction }  from 'express'
import type { Request }       from 'express'
import type { Response }      from 'express'

import      { HttpException } from './base.ts'

export * from './base.ts'
export * from './bad-request.ts'
export * from './not-found.ts'

export function handler(err: Error, _: Request, res: Response, next: NextFunction) {
	if (err instanceof HttpException) {
		return res.status(err.code).json({ error: err.error.toString() })
	}

	next(err)
}
