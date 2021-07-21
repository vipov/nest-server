import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '../config';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
          secret: config.JWT_SECRET,
          signOptions: { expiresIn: '100h' },
      })
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService]
})
export class UsersModule {}
