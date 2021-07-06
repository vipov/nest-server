import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ConfigService } from '../src/config';
import { UserLoginRequestDto, UserLoginResponseDto, UserRegisterRequestDto, UserRegisterResponseDto } from '../src/user/dto';
import { TokenPayloadEntity, UserRole } from '../src/user/entities';
import { AuthService } from '../src/user/services';

describe('UserController (e2e)', () => {
  let app;
  let config: ConfigService;
  let authService: AuthService;
  
  const configMock = {
    JWT_SECRET: 'jwt-secret',
    TOKEN_HEADER_NAME: 'api_token',
  } as ConfigService

  beforeEach(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(ConfigService).useValue(configMock)
    .compile();

    app = moduleFixture.createNestApplication();
    config = app.get(ConfigService)
    authService = app.get(AuthService)
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
      .expect(201)
      .then(res => {
        expect(res.body).toMatchObject(resBody);
      });
  });

  it('/user/login ERROR', () => {
    const req: UserLoginRequestDto = {
      email: 'piotr@myflow.pl',
      password: '0004',
    };

    return request(app.getHttpServer())
      .post('/user/login')
      .send(req)
      .expect(401); 
  });
  
  it('/user (GET)', async () => {
    const tokenPayload: TokenPayloadEntity = {
      user: {
        id: 1,
        name: 'piotr',
        email: 'piotr@myflow.pl',
        roles: [UserRole.ADMIN]
      },
    };
    const resBody: TokenPayloadEntity = {
      user: {
        id: expect.any(Number),
        name: 'piotr',
        email: 'piotr@myflow.pl',
        roles: [UserRole.ADMIN]
      },
    };
    const token = await authService.tokenSign(tokenPayload);

    return request(app.getHttpServer())
      .get('/user')
      .set(config.TOKEN_HEADER_NAME, token)
      // .expect(200)
      .then(res => {
        expect(res.body).toMatchObject(resBody);
        expect(res.status).toBe(200);
      });
  });
  
  it('/user (GET)', async () => {
    const tokenPayload: TokenPayloadEntity = {
      user: {
        id: 1,
        name: 'piotr',
        email: 'piotr@myflow.pl',
        roles: []
      },
    };
    const token = await authService.tokenSign(tokenPayload);

    return request(app.getHttpServer())
      .get('/user')
      .set(config.TOKEN_HEADER_NAME, token)
      .then(res => {
        expect(res.status).toBe(401);
      });
  });

});
