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
    TypeOrmModule.forFeature([User, Role])
  ],
  controllers: [AuthController, UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
