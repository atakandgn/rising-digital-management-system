import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './service.model';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';

@Module({
  imports: [SequelizeModule.forFeature([Service])],
  providers: [ServiceService],
  controllers: [ServiceController],
})
export class ServiceModule {}
