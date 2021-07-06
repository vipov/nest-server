import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserMiddleware } from './middlewares/user.middleware';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ConfigModule } from '../config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../shared/http-exception.filter';

@Module({
  imports: [ConfigModule],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(UserController);
  }
}
