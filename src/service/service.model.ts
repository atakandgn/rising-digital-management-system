import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Order } from '../order/order.model';

@Table
export class Service extends Model<Service> {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  price: number;

  @Column
  amount: number;

  @HasMany(() => Order)
  orders: Order[];
}
