import { Model }      from 'sequelize'
import { Column }     from 'sequelize-typescript'
import { PrimaryKey } from 'sequelize-typescript'
import { Table }      from 'sequelize-typescript'

@Table({ tableName: 'tasks_history', timestamps: false })
export class TaskHistory extends Model {
	@PrimaryKey
	@Column
	declare id: string

	@Column
	declare taskId: string

	@Column
	declare duration: number
}
