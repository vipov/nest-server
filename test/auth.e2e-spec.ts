import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from '../src/app.service';
import { AuthLoginDto, AuthLoginResponse, AuthRegisterDto, AuthRegisterResponse } from '../src/users/dto';
import { User } from '../src/users/entities';
import { AuthService } from '../src/users/services';
import { resolve } from 'path';
import { readFileSync } from 'fs';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = app.get(AuthService);
    
  });

  it('/auth/register Success', () => {

    const reqBody: AuthRegisterDto = {
      email: 'piotr@myflow.pl',
      name: 'Piotr',
      password: '123',
    }

    const resBody: AuthRegisterResponse = {
      user: {
        id: expect.any(Number),
        name: 'Piotr',
        email: 'piotr@myflow.pl',
      }
    }

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(reqBody)
      .then(res => {
        expect(res.body).toMatchObject(resBody)
      });
  });

  it('/auth/login Success', () => {

    const reqBody: AuthLoginDto = {
      email: 'piotr@myflow.pl',
      password: '123',
    }

    const resBody: AuthLoginResponse = {
      token: expect.any(String),
      user: {
        id: expect.any(Number),
        name: 'Piotr',
        email: 'piotr@myflow.pl',
      }
    }

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(reqBody)
      .then(res => {
        expect(res.body).toMatchObject(resBody);
        expect(res.status).toBe(201)
      });
  });

  it('/auth/login Validation Errors', () => {

    const reqBody: AuthLoginDto = {
      email: 'piotrmyflow.pl',
      password: '12',
    }

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(reqBody)
      .then((res) => {
        const body = res.body as ErrorResponse;
        expect(body.data.message[0]).toBe('email must be an email');
        expect(body.data.message[1]).toContain('password');
        expect(res.status).toBe(400)
      });
  });

  it('/auth Forbidden', () => {

    return request(app.getHttpServer())
      .get('/auth')
      .then((res) => {
        expect(res.status).toBe(403)
      });
  });

  it('/auth Success', async () => {

    const user: User = {
      id: 1,
      name: 'Piotr',
      email: 'piotr@myflow.pl',
    }

    const token = await authService.encodeUserToken(user);

    return request(app.getHttpServer())
      .get('/auth')
      .set('Authorization', 'Bearer ' + token)
      .then((res) => {
        expect(res.body).toMatchObject(user);
        expect(res.status).toBe(200)
      });
  });

  it('/photos/upload Success', async () => {

    const file = 'logo.png';
    const filePath = resolve('./test/fixtures/logo.png');

    const resBody = {
      photo: expect.any(Object),
      thumbs: expect.any(Object),
      file: expect.any(Object),
      data: {
        description: 'my test description'
      },
    }

    return request(app.getHttpServer())
      .post('/photos/upload')
      .field('description', resBody.data.description)
      .attach('file', readFileSync(filePath), file)
      .then((res) => {
        expect(res.body).toMatchObject(resBody);
        expect(res.status).toBe(201)
      });
  });
});

export class ErrorResponse {
  data: {
    message: string[];
    statusCode: number;
  }
}