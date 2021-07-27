import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '../config';
import { LOGGER_SCOPE } from './LOGGER_SCOPE';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.JWT_SECRET,
        signOptions: {expiresIn: '200h'}
      })
    })
  ],
  controllers: [UsersController, AuthController],
  providers: [
    UsersService, 
    AuthService, 
    {
      provide: LOGGER_SCOPE,
      useValue: 'UserModule'
    },
    {
      provide: Logger, 
      inject: [LOGGER_SCOPE],
      useFactory: (scope: string) => {

        return new Logger(scope);
      }
    }
  ],
  exports: [UsersService],
})
export class UsersModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController)
  }

}
