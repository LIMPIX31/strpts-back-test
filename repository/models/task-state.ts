import { Model }      from 'sequelize'
import { Column }     from 'sequelize-typescript'
import { DataType }   from 'sequelize-typescript'
import { PrimaryKey } from 'sequelize-typescript'
import { Table }      from 'sequelize-typescript'

@Table({ tableName: 'task_states', timestamps: false })
export class TaskState extends Model {
	@PrimaryKey
	@Column
	declare id: string

	@Column({ type: DataType.ENUM('pending', 'running') })
	declare state: 'pending' | 'running'

	@Column({ type: DataType.STRING, allowNull: true })
	declare service_id: string | null

	@Column({ type: DataType.DATE, allowNull: true })
	declare startedAt: Date | null
}
