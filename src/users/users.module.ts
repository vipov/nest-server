import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  controllers: [UsersController, AuthController],
  providers: [
    UsersService, 
    AuthService, 
    LoggerMiddleware,
    // Logger,
    {
      provide: Logger, 
      useValue: new Logger('UserModule')
    }
  ],
  exports: [UsersService],
})
export class UsersModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController)
  }

}
