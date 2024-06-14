import { Controller, Get, Post, Body, UseGuards, Request, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../dto/order/create.order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.userId;
    return this.orderService.createOrder(userId, createOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllOrders(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    const userId = req.user.userId;
    return this.orderService.findAllOrders(userId, { page, limit, search });
  }
}
