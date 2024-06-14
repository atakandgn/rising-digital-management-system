import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/dto/user/create.user.dto';
import { LoginDto } from '../src/dto/auth/login.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/register (POST) - success', async () => {
    const createUserDto: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe3@example.com',
      password: 'Password123',
    };

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(createUserDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.email).toBe(createUserDto.email);
        expect(res.body.balance).toBe(0);
        expect(res.body.createdAt).toBeDefined();
        expect(res.body.updatedAt).toBeDefined();
      });
  });

  it('/auth/register (POST) - email already exists', async () => {
    const createUserDto: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe3@example.com',
      password: 'Password123',
    };

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(createUserDto)
      .expect(400) 
      .expect((res) => {
        expect(res.body.message).toBe('User with this email already exists');
      });
  });

  it('/auth/login (POST) - success', async () => {
    const loginDto: LoginDto = {
      email: 'atakandogan@gmail.com',
      password: 'Atakan123+',
    };

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200) 
      .expect((res) => {
        expect(res.body.access_token).toBeDefined();
        expect(res.body.userData.email).toBe(loginDto.email);
        expect(res.body.userData.createdAt).toBeDefined();
        expect(res.body.userData.updatedAt).toBeDefined();
      });
  });

  it('/auth/login (POST) - wrong password', async () => {
    const loginDto: LoginDto = {
      email: 'john.doe@example.com',
      password: 'WrongPassword',
    };

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe("User with this email does not exist");
      });
  });

  it('/auth/login (POST) - user not found', async () => {
    const loginDto: LoginDto = {
      email: 'not.existing@example.com',
      password: 'Password123',
    };

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('User with this email does not exist');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
