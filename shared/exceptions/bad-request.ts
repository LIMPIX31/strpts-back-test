import type { ToString }      from './base.ts'
import      { HttpException } from './base.ts'

export class BadRequest extends HttpException {
	constructor(error: ToString) {
		super(400, error)
	}
}
