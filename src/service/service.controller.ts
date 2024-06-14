import { Controller, Get, Post, Body, UseGuards, Query,Param ,Delete} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ServiceService } from './service.service';
import { Service } from './service.model';
import { CreateServiceDto } from '../dto/service/create.service.dto';
import { UpdateServiceDto } from '../dto/service/update.service.dto';
import { DeleteServiceDto } from '../dto/service/delete.service.dto';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ): Promise<{ totalServices: number, page: number, perPage: number, services: Service[] }> {
    return this.serviceService.findAll({ page, limit, search });
  }

  @UseGuards(JwtAuthGuard)
  @Post('createNewService')
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.serviceService.create(createServiceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('updateService')
  async update(@Body() updateServiceDto: UpdateServiceDto): Promise<Service> {
    return this.serviceService.update(updateServiceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteService/:id')
  async delete(@Param('id') id: number) {
    return this.serviceService.delete({ id });
  }
}
