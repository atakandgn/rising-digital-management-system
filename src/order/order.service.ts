import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { CreateOrderDto } from '../dto/order/create.order.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { Service } from '../service/service.model';
import { Op } from 'sequelize';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(Service)
    private readonly serviceModel: typeof Service,
    private readonly userService: UserService,
  ) {}

  async createOrder(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const service = await this.serviceModel.findByPk(createOrderDto.serviceId);

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    const totalCost = service.price * createOrderDto.quantity;

    if (user.balance < totalCost) {
      throw new BadRequestException('Insufficient balance');
    }

    user.balance -= totalCost;
    await user.save();

    const order = new Order({
      userId,
      serviceId: service.id,
      quantity: createOrderDto.quantity,
      totalPrice: totalCost,
    });

    const savedOrder = await order.save();

    return {
      ...savedOrder.get(),
      createdAt: new Date(savedOrder.createdAt).toLocaleString("tr-TR"),
      updatedAt: new Date(savedOrder.updatedAt).toLocaleString("tr-TR"),
    } as Order;
  }

  async findAllOrders(userId: number, query: { page: number, limit: number, search?: string }): Promise<{ totalOrders: number, page: number, perPage: number, orders: any[] }> {
    const { page, limit, search } = query;
    const offset = (page - 1) * limit;
    const where = {
      userId,
      ...(search && {
        [Op.or]: [
          { '$Service.name$': { [Op.like]: `%${search}%` } },
          { '$Service.description$': { [Op.like]: `%${search}%` } },
        ],
      }),
    };

    const { count, rows } = await this.orderModel.findAndCountAll({
      where,
      include: [Service, User],
      limit,
      offset,
    });

    const orders = rows.map(order => ({
      id: order.id,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      createdAt: new Date(order.createdAt).toLocaleString("tr-TR"),
      updatedAt: new Date(order.updatedAt).toLocaleString("tr-TR"),
      service: {
        id: order.service.id,
        name: order.service.name,
        description: order.service.description,
        price: order.service.price,
        amount: order.service.amount,
        createdAt: order.service.createdAt,
        updatedAt: order.service.updatedAt,
      },
      user: {
        id: order.user.id,
        firstName: order.user.firstName,
        lastName: order.user.lastName,
        email: order.user.email,
      }
    }));

    return {
      totalOrders: count,
      page,
      perPage: limit,
      orders,
    };
  }
}
