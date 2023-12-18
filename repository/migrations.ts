import { SequelizeStorage } from 'umzug'
import { Umzug }            from 'umzug'

import { connection }       from './connection.ts'
import * as migrations      from './migrations/all.ts'

export const umzug = new Umzug({
	migrations: Object.values(migrations),
	context: connection.getQueryInterface(),
	storage: new SequelizeStorage({ sequelize: connection }),
	logger: console,
})

await umzug.up()
