import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './service.model';
import { CreateServiceDto } from '../dto/service/create.service.dto';
import { UpdateServiceDto } from '../dto/service/update.service.dto';
import { DeleteServiceDto } from '../dto/service/delete.service.dto';
import { Op } from 'sequelize';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service)
    private readonly serviceModel: typeof Service,
  ) {}

  async findAll(query: { page: number, limit: number, search?: string }): Promise<{ totalServices: number, page: number, perPage: number, services: any[] }> {
    const { page, limit, search } = query;
    const offset = (page - 1) * limit;
    const where = search ? {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ],
    } : {};

    const { count, rows } = await this.serviceModel.findAndCountAll({
      where,
      limit,
      offset,
    });

    const services = rows.map(service => ({
      ...service.get(),
      createdAt: new Date(service.createdAt).toLocaleString("tr-TR"),
      updatedAt: new Date(service.updatedAt).toLocaleString("tr-TR"),
    }));

    return {
      totalServices: count,
      page,
      perPage: limit,
      services,
    };
  }

  async create(createServiceDto: CreateServiceDto): Promise<any> {
    const existingService = await this.serviceModel.findOne({ where: { name: createServiceDto.name } });
    if (existingService) {
      throw new BadRequestException('Service with this name already exists');
    }

    const service = await this.serviceModel.create(createServiceDto);
    if (!service) {
      throw new NotFoundException('Service not created');
    }

    return {
      ...service.get(),
      createdAt: new Date(service.createdAt).toLocaleString("tr-TR"),
      updatedAt: new Date(service.updatedAt).toLocaleString("tr-TR"),
    };
  }

  async update(updateServiceDto: UpdateServiceDto): Promise<any> {
    const service = await this.serviceModel.findByPk(updateServiceDto.id);
    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (updateServiceDto.name) {
      service.name = updateServiceDto.name;
    }
    if (updateServiceDto.description) {
      service.description = updateServiceDto.description;
    }
    if (updateServiceDto.price) {
      service.price = updateServiceDto.price;
    }
    if (updateServiceDto.amount) {
      service.amount = updateServiceDto.amount;
    }

    await service.save();

    return {
      ...service.get(),
      createdAt: new Date(service.createdAt).toLocaleString("tr-TR"),
      updatedAt: new Date(service.updatedAt).toLocaleString("tr-TR"),
    };
  }

  async delete(deleteServiceDto: DeleteServiceDto): Promise<void> {
    const service = await this.serviceModel.findByPk(deleteServiceDto.id);
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    await service.destroy();
  }
}
