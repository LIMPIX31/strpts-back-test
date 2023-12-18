export interface ToString {
	toString(): string
}

export class HttpException extends Error {
	constructor(
		readonly code: number,
		readonly error: ToString,
	) {
		super()
	}
}
