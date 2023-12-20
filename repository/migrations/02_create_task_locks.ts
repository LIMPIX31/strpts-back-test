import type { QueryInterface } from 'sequelize'
import      * as Type          from 'sequelize'

export const name = '02_create_task_locks'

const TABLE_NAME = 'task_locks'

export async function up({ context }: { context: QueryInterface }) {
	await context.createTable(TABLE_NAME, {
		id: {
			type: Type.STRING,
			allowNull: false,
			primaryKey: true,
		},
	})
}

export async function down({ context }: { context: QueryInterface }) {
	await context.dropTable(TABLE_NAME)
}
