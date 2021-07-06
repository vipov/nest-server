import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserMiddleware } from './middlewares/user.middleware';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ConfigModule } from '../config';

@Module({
  imports: [ConfigModule],
  controllers: [UserController],
  providers: [UserService, AuthService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(UserController);
  }
}
