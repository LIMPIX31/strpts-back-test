import { Sequelize } from 'sequelize-typescript'

import * as models   from './models.ts'

export const connection = new Sequelize({
	host: process.env.DB_HOST ?? '0.0.0.0',
	port: Number(process.env.DB_PORT ?? '5432'),
	database: process.env.DB_NAME ?? 'db',
	dialect: 'postgres',
	username: process.env.DB_USER ?? 'root',
	password: process.env.PASSWORD ?? 'root',
	models: Object.values(models) as any[],
	logging: console.log,
})
