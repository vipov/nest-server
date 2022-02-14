import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService],
  exports: [AuthService],
})
export class UsersModule {}
