import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '../config';
import { StorageModule } from '../storage/storage.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from './entities/user.entity';
import { UsersAdminController } from './users-admin/users-admin.controller';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    ConfigModule,
    StorageModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.JWT_SECRET,
        signOptions: { expiresIn: '4d'}
      }),
    }),
    TypeOrmModule.forFeature([User, Role, UserRepository])
  ],
  controllers: [AuthController, UsersController, UsersAdminController],
  providers: [UsersService, AuthService],
  exports: [AuthService],
})
export class UsersModule {}
