import { Controller, Post, Body, UseGuards, Request,Delete,Param } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddBalanceUserDto } from '../dto/user/addBalance.user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add-balance')
  async addBalance(@Request() req, @Body() addBalanceUserDto: AddBalanceUserDto) {
    const userId = req.user.userId;
    return this.userService.addBalance(userId, addBalanceUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
