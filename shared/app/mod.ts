import { Express } from 'express'

export let app!: Express

export function init(expressApp: Express) {
	app = expressApp
}
