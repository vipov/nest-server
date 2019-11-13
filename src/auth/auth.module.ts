import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfig } from './auth.config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [AuthModule],
      useFactory: (config: AuthConfig) => {
        return {
          secret: config.JWT_SECRET,
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [AuthConfig],
    }),
  ],
  providers: [AuthService, LocalStrategy, AuthConfig, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthConfig],
})
export class AuthModule { }
