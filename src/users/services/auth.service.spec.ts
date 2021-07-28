import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { RequestPayload, User } from '../entities';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;

  const user = new User({
    id: 1,
    name: 'Piotr'
  });

  const userMockService = {
    async findBy(data) {
      return [user];
    }
  } as UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({secret: 'mySecret'})
      ],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: userMockService
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should encode & decode user token', async () => {

    const token = await service.encodeUserToken(user);

    expect(typeof token).toBe('string');

    const payload: RequestPayload = {
      user
    }

    await expect(service.decodeUserToken(token)).resolves.toMatchObject(payload);
  });
});
