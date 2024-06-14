import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('OrderController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let userId: number;
  let serviceId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@example.com',
        password: 'Password123',
      });

    userId = registerResponse.body.id;

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'alice.smith@example.com',
        password: 'Password123',
      });

    jwtToken = loginResponse.body.access_token;

    const createServiceResponse = await request(app.getHttpServer())
      .post('/services/createNewService')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        name: 'Test Service',
        description: 'Test Service Description',
        price: 5.00,
        amount: 10,
      });

    serviceId = createServiceResponse.body.id;
  });

  it('/orders/create (POST) - success', async () => {
    await request(app.getHttpServer())
      .post('/users/add-balance')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ amount: 100 });

    return request(app.getHttpServer())
      .post('/orders/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ serviceId, quantity: 2 })
      .expect(201)
      .expect((res) => {
        expect(res.body.totalPrice).toBe(10);
        expect(res.body.createdAt).toBeDefined();
        expect(res.body.updatedAt).toBeDefined();
      });
  });

  it('/orders/create (POST) - insufficient balance', async () => {
    return request(app.getHttpServer())
      .post('/orders/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ serviceId, quantity: 999999 })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Insufficient balance');
      });
  });

  it('/orders (GET) - success', async () => {
    return request(app.getHttpServer())
      .get('/orders')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.totalOrders).toBeDefined();
        expect(res.body.page).toBeDefined();
        expect(res.body.perPage).toBeDefined();
        expect(res.body.orders).toBeInstanceOf(Array);
        res.body.orders.forEach(order => {
          expect(order.id).toBeDefined();
          expect(order.quantity).toBeDefined();
          expect(order.totalPrice).toBeDefined();
          expect(order.createdAt).toBeDefined();
          expect(order.updatedAt).toBeDefined();
          expect(order.service).toBeDefined();
          expect(order.user).toBeDefined();
          expect(order.user.id).toBeDefined();
          expect(order.user.firstName).toBeDefined();
          expect(order.user.lastName).toBeDefined();
          expect(order.user.email).toBeDefined();
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
