import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '../../config';
import { AuthService, UserService } from '../services';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [ConfigModule],
      controllers: [UserController],
      providers: [AuthService, UserService, {
        provide: ConfigService,
        useValue: {
          JWT_SECRET: "jwt-secret"
        }
      }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
