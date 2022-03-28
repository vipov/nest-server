import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

export class MyMockUserService extends UsersService {
  constructor() {
    super();
    this.users = [];
    this.roles = []
  }
}

@Module({
  imports: [],
  controllers: [UsersController, AuthController],
  providers: [
    {
      provide: UsersService,
      useClass: process.env.NODE_ENV !== 'dev' ? MyMockUserService : UsersService,
    }, 
    AuthService
  ],
  exports: [UsersService],
})
export class UsersModule {}
