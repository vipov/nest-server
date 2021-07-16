import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services';
import { AuthService } from './services/auth/auth.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule {}
