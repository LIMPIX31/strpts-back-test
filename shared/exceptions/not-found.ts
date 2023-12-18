import { HttpException } from '@shared/exceptions'
import { ToString }      from '@shared/exceptions'

export class NotFound extends HttpException {
	constructor(error?: ToString) {
		super(404, error ?? 'Not found')
	}
}
