import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateServiceDto } from '../src/dto/service/create.service.dto';

describe('ServiceController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        password: 'Password123',
      });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'bob.brown@example.com',
        password: 'Password123',
      });

    jwtToken = loginResponse.body.access_token;
  });

  it('/services/createNewService (POST) - success', async () => {
    const createServiceDto: CreateServiceDto = {
      name: 'Demo Service',
      description: 'This is a demo service.',
      price: 15.00,
      amount: 5,
    };

    return request(app.getHttpServer())
      .post('/services/createNewService')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createServiceDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBe(createServiceDto.name);
        expect(res.body.description).toBe(createServiceDto.description);
        expect(res.body.price).toBe(createServiceDto.price);
        expect(res.body.amount).toBe(createServiceDto.amount);
      });
  });

  it('/services/createNewService (POST) - duplicate name', async () => {
    const createServiceDto: CreateServiceDto = {
      name: 'Express Shipping',
      description: 'Another description for the same name.',
      price: 20.00,
      amount: 10,
    };

    return request(app.getHttpServer())
      .post('/services/createNewService')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createServiceDto)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Service with this name already exists');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
