import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Service } from '../service/service.model';

@Table
export class Order extends Model<Order> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Service)
  @Column
  serviceId: number;

  @Column
  quantity: number;

  @Column
  totalPrice: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Service)
  service: Service;
}