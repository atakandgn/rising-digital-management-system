import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0, 
  })
  balance: number;
}
