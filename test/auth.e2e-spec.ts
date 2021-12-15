import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  AuthLoginDto,
  AuthLoginResponse,
  AuthRegisterDto,
  AuthRegisterResponse,
} from '../src/users/dto/auth.dto';
import { UsersErrorResponse } from '../src/users/dto/user.dto';
import { User } from '../src/users/entities/user.entity';
import { AuthService } from '../src/users/services/auth.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = app.get(AuthService);
  });

  it('/auth/register (POST) should throw validation error 400', () => {
    return request(app.getHttpServer()).post('/auth/register').expect(400);
  });

  it('/auth/register (POST) should register new user', () => {
    const reqBody: AuthRegisterDto = {
      name: 'Piotr',
      email: 'piotr@blaszczak.pl',
      password: '!@#',
      age: '18',
    };
    const resBody: AuthRegisterResponse = {
      user: {
        id: expect.any(Number),
        name: 'Piotr',
        email: 'piotr@blaszczak.pl',
      },
    };
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(reqBody)
      .expect(201)
      .then((res) => {
        expect(res.body).toMatchObject(resBody);
      });
  });

  it('/auth/login (POST) should login successfully', () => {
    const reqBody: AuthLoginDto = {
      email: 'piotr@myflow.pl',
      password: '!@#',
    };
    const resBody: AuthLoginResponse = {
      token: expect.any(String),
      user: {
        id: expect.any(Number),
        name: 'Piotr',
        email: 'piotr@myflow.pl',
      },
    };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(reqBody)
      .expect(201)
      .then((res) => {
        expect(res.body).toMatchObject(resBody);
      });
  });

  it('/auth/me (GET) should throw forbidden 403', () => {
    const resBody: UsersErrorResponse = {
      error: 'Forbidden',
      message: 'Forbidden resource',
      statusCode: 403,
    };
    return request(app.getHttpServer())
      .get('/auth/me')
      .expect(403)
      .then((res) => {
        expect(res.body).toMatchObject(resBody);
      });
  });

  it('/auth/me (GET) should return user', async () => {
    const resBody: User = {
      id: 1,
      name: 'Piotr',
      email: 'piotr@myflow.pl',
    };
    const token = await authService.encodeUserToken(resBody);

    return request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toMatchObject(resBody);
      });
  });
});
