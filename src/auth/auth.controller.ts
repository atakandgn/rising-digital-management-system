import { Controller, Post, Body,BadRequestException,HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/auth/login.dto';
import { CreateUserDto } from '../dto/user/create.user.dto';
import { UserService } from '../user/user.service';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const userOrError = await this.authService.validateUser(loginDto);
    if (typeof userOrError === 'string') {
      return userOrError; 
    }
    return this.authService.login(userOrError);
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}