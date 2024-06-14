import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { User } from '../user/user.model';
import { Service } from '../service/service.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, User, Service]),
    UserModule 
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
