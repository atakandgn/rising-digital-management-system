import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
