import { Model }      from 'sequelize'
import { Column }     from 'sequelize-typescript'
import { PrimaryKey } from 'sequelize-typescript'
import { Table }      from 'sequelize-typescript'

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
	@PrimaryKey
	@Column
	declare id: string

	@Column
	declare balance: number
}
