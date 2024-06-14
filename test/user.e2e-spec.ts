import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let userId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'Password123',
      });

    userId = registerResponse.body.id;

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'jane.doe@example.com',
        password: 'Password123',
      });

    jwtToken = loginResponse.body.access_token;
  });

  it('/users/add-balance (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/users/add-balance')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ amount: 100 })
      .expect(201)
      .expect((res) => {
        expect(res.body.balance).toBe(100);
      });
  });

  it('/users/:id (DELETE) - success', async () => {
    return request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('User deleted successfully');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
