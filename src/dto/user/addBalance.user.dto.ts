import { IsNumber, IsPositive } from 'class-validator';

export class AddBalanceUserDto {
  @IsNumber()
  @IsPositive()
  amount: number;
}
