import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthLoginDto, AuthLoginResponse, AuthRegisterDto, AuthRegisterResponse } from '../src/users/dto/auth.dto';
import { User } from '../src/users/entities/user.entity';
import { AuthService } from '../src/users/services/auth.service';

describe('AuthController (e2e)', () => {
  
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    const authService = await app.get(AuthService);
    token = await authService.encodeUserToken({id: 1} as User);

    await app.init();
    
  });

  it('/auth/register (GET) should regurn 400 Bead Request', () => {

    return request(app.getHttpServer())
      .post('/auth/register')
      .expect(400)
  });

  it('/auth/register (GET) should create user', () => {

    const reqBody: AuthRegisterDto = {
      name: 'Piotr',
      email: 'piotr@myflow.pl',
      password: '!@#',
    };
    const resBody: AuthRegisterResponse = {
      user: {
        name: 'Piotr',
        id: expect.any(Number),
        email: 'piotr@myflow.pl',
      }
    };

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(reqBody)
      .expect(201)
      .then((res) => {
        expect(res.body).toMatchObject(resBody);
      });
  });

  it('/auth/login (GET) should login user', () => {

    const reqBody = {
      email: 'piotr@myflow.pl',
      password: '123',
    } as AuthLoginDto;

    const resBody: AuthLoginResponse = {
      token: expect.any(String),
      user: {
        name: 'Piotr',
        id: expect.any(Number),
        email: 'piotr@myflow.pl',
      }
    };

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(reqBody)
      .expect(201)
      .then((res) => {
        // token = res.body.token;
        expect(res.body).toMatchObject(resBody);
      });
  });

  it('/auth/me (GET) should return 403 Forbidden resource', () => {

    return request(app.getHttpServer())
      .get('/auth/me')
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body.statusCode).toBe(403);
      });
  });

  it('/auth/me (GET) should return logged user', () => {

    const resBody: User = {
      name: 'Piotr',
      id: expect.any(Number),
      email: 'piotr@myflow.pl',
    };

    return request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        expect(res.body).toMatchObject(resBody);
      });
  });

});
