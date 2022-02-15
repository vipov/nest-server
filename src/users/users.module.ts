import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { UsersAdminController } from './controllers/users-admin.controller';

@Module({
  controllers: [UsersController, AuthController, UsersAdminController],
  providers: [UsersService, AuthService],
  exports: [AuthService],
})
export class UsersModule {}
