import type { QueryInterface } from 'sequelize'

export const name = '01_seeding'

export async function up({ context }: { context: QueryInterface }) {
	await context.insert(null, 'users', { id: 'idlike', balance: 10000 })
}

export async function down({ context }: { context: QueryInterface }) {
	await context.delete(null, 'users', { id: 'idlike' })
}
