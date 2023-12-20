import { Model }      from 'sequelize'
import { Column }     from 'sequelize-typescript'
import { PrimaryKey } from 'sequelize-typescript'
import { Table }      from 'sequelize-typescript'

@Table({ tableName: 'task_workers', timestamps: false })
export class TaskWorker extends Model {
	@PrimaryKey
	@Column
	declare id: string

	@Column
	declare load: number
}
