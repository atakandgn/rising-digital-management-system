import { Injectable,BadRequestException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { LoginDto } from '../dto/auth/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User | string> {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }
    const isPasswordValid = await this.userService.validatePassword(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    return user;
  }

  async login(user: User) {
    const payload = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      balance: user.balance,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return {
      access_token: this.jwtService.sign(payload),
      userData: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        balance: user.balance,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    };
  }
}
