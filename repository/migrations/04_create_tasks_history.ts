import type { QueryInterface } from 'sequelize'
import      * as Type          from 'sequelize'

export const name = '04_create_tasks_history'

const TABLE_NAME = 'tasks_history'

export async function up({ context }: { context: QueryInterface }) {
	await context.createTable(TABLE_NAME, {
		id: {
			type: Type.STRING,
			allowNull: false,
			primaryKey: true,
		},
		taskId: {
			type: Type.STRING,
			allowNull: false,
		},
		duration: {
			type: Type.INTEGER,
			allowNull: false,
		},
	})
}

export async function down({ context }: { context: QueryInterface }) {
	await context.dropTable(TABLE_NAME)
}
