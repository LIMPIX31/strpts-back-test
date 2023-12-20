import type { QueryInterface } from 'sequelize'
import      * as Type          from 'sequelize'

export const name = '05_create_task_workers'

const TABLE_NAME = 'task_workers'

export async function up({ context }: { context: QueryInterface }) {
	await context.createTable(TABLE_NAME, {
		id: {
			type: Type.STRING,
			allowNull: false,
			primaryKey: true,
		},
		load: {
			type: Type.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
	})
}

export async function down({ context }: { context: QueryInterface }) {
	await context.dropTable(TABLE_NAME)
}
