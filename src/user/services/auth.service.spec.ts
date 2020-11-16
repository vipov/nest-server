import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '../../config';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [ConfigModule],
      providers: [
        AuthService, 
        {
          provide: ConfigService,
          useValue: {
            JWT_SECRET: 'jwt secret'
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('token generation', async () => {
    const payload = {
        user: {
          id: 1,
          name: 'piotr',
          email: 'piotr@myflow.pl',
        },
      };
    const token = await service.tokenSign(payload);
    expect(typeof token).toBe('string');

    await expect(service.tokenDecode(token)).toMatchObject(payload);

    // service.tokenDecode(token).then(p => {
    //   expect(p).toMatchObject(payload);
    //   done()
    // })
  });
});
