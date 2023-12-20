import { Model }      from 'sequelize'
import { Column }     from 'sequelize-typescript'
import { PrimaryKey } from 'sequelize-typescript'
import { Table }      from 'sequelize-typescript'

@Table({ tableName: 'task_locks', timestamps: false })
export class TaskLock extends Model {
	@PrimaryKey
	@Column
	declare id: string
}
