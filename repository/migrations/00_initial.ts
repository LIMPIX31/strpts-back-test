import type { QueryInterface } from 'sequelize'
import      * as Type          from 'sequelize'

export const name = '00_initial'

export async function up({ context }: { context: QueryInterface }) {
	await context.createTable('users', {
		id: {
			type: Type.STRING,
			allowNull: false,
			primaryKey: true,
		},
		balance: {
			type: Type.INTEGER,
			allowNull: false,
		},
	})
}

export async function down({ context }: { context: QueryInterface }) {
	await context.dropTable('users')
}
