require('dotenv').config();

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../src/config';
import { TokenPayloadModel, UserRole } from '../src/user/models';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserLoginRequestDto, UserLoginResponseDto, UserRegisterRequestDto, UserRegisterResponseDto } from '../src/user/dto';
import { AuthService } from '../src/user/services';

describe('UserController (e2e)', () => {
  let app, token: string, payload: TokenPayloadModel,  configService: ConfigService, authService: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      // providers: [{
      //   provide: AuthService,
      //   useValue: {tokenSign: () => 'token'}
      // }]
    })
    // .overrideProvider(AuthService).useValue({tokenSign: () => 'token'})
    .compile();

    app = moduleFixture.createNestApplication();
    
    configService = app.get(ConfigService);
    authService = app.get(AuthService);
    payload = {
      user: {
        id: 1,
        name: 'piotr',
        email: 'piotr@myflow.pl',
        roles: [UserRole.ADMIN]
      },
    };
    
    token = authService.tokenSign(payload);
    await app.init();
  });

  it('/user/register (POST)', () => {
    const req: UserRegisterRequestDto = {
      name: 'piotr',
      email: 'piotr@myflow.pl',
      password: '123',
    };
    const res: UserRegisterResponseDto = {
      user: {
        id: expect.any(Number),
        name: 'piotr',
        email: 'piotr@myflow.pl',
      },
    };
    return request(app.getHttpServer())
      .post('/user/register')
      .send(req)
      .expect(201)
      .then(r => {
        expect(r.body).toMatchObject(res);
      });
  });
    
  it('/user/login SUCCESS', () => {
    const req: UserLoginRequestDto = {
      email: 'piotr@myflow.pl',
      password: '123',
    };
    const resBody: UserLoginResponseDto = {
      token: expect.any(String),
      user: {
        id: expect.any(Number),
        name: 'Piotr',
        email: 'piotr@myflow.pl',
      },
    };
    return request(app.getHttpServer())
      .post('/user/login')
      .send(req)
      .then(res => {
        expect(res.body).toMatchObject(resBody);
        expect(res.status).toBe(201);
      });
  });

  it('/user/login Incorrect password', () => {
    const req: UserLoginRequestDto = {
      email: 'piotr@myflow.pl',
      password: '0004',
    };

    return request(app.getHttpServer())
      .post('/user/login')
      .send(req)
      .expect(401);
  });

  it('/user/login  Password to short', () => {
    const req: UserLoginRequestDto = {
      email: 'piotr@myflow.pl',
      password: '00',
    };
    const resBody = {
      statusCode: 400,
      message: [ 'password must be longer than or equal to 3 characters' ],
      error: 'Bad Request'
    };

    return request(app.getHttpServer())
      .post('/user/login')
      .send(req)
      .then(res => {
        expect(res.body).toMatchObject(resBody);
        expect(res.body.message[0]).toBe('password must be longer than or equal to 3 characters')
        expect(res.status).toBe(400);
      });
  });

  it('/user/login email incorrect', () => {
    const req: UserLoginRequestDto = {
      email: 'piotrmyflow.pl',
      password: '004',
    };
    const resBody = {
      statusCode: 400,
      message: [ 'email must be an email' ],
      error: 'Bad Request'
    };

    return request(app.getHttpServer())
      .post('/user/login')
      .send(req)
      .then(res => {
        expect(res.body).toMatchObject(resBody);
      });
  });

  it('/user (GET)', () => {

    return request(app.getHttpServer())
      .get('/user')
      .set(configService.TOKEN_HEADER_NAME, token)
      .then(res => {
        expect(res.body).toMatchObject(payload.user);
      });
  });

  it('/user (GET) AuthGuard Forbidden', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(403);
  });
  
});
