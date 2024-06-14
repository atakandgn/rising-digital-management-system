import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from '../dto/user/create.user.dto';
import { AddBalanceUserDto } from '../dto/user/addBalance.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new User({
      ...createUserDto,
      password: hashedPassword,
      balance: 0, 
    });
    const savedUser = await user.save();
    const { password, ...userWithoutPassword } = savedUser.toJSON();
    return {
      ...userWithoutPassword,
      createdAt: new Date(savedUser.createdAt).toLocaleString("tr-TR"),
      updatedAt: new Date(savedUser.updatedAt).toLocaleString("tr-TR"),
    };
  }

  async validatePassword(inputPassword: string, storedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPassword);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async findOne(userId: number): Promise<User> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async addBalance(userId: number, addBalanceUserDto: AddBalanceUserDto): Promise<any> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.balance += addBalanceUserDto.amount;
    await user.save();
    
    const { password, ...userWithoutPassword } = user.toJSON();
    return {
      ...userWithoutPassword,
      createdAt: new Date(user.createdAt).toLocaleString("tr-TR"),
      updatedAt: new Date(user.updatedAt).toLocaleString("tr-TR"),
    };
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.findOne(userId);
    await user.destroy();
  }
}
