import type { QueryInterface } from 'sequelize'
import      * as Type          from 'sequelize'

export const name = '03_create_task_states'

const TABLE_NAME = 'task_states'

export async function up({ context }: { context: QueryInterface }) {
	await context.createTable(TABLE_NAME, {
		id: {
			type: Type.STRING,
			allowNull: false,
			primaryKey: true,
		},
		state: {
			type: Type.ENUM,
			allowNull: false,
			values: ['pending', 'running'],
		},
		service_id: {
			type: Type.STRING,
			allowNull: true,
		},
		startedAt: {
			type: Type.DATE,
			allowNull: true,
		},
	})
}

export async function down({ context }: { context: QueryInterface }) {
	await context.dropTable(TABLE_NAME)
}
