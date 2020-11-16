import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { logger, UserMiddleware } from './middlewares';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ConfigModule } from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './entities';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature(Object.values(entities)),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [
    UserService,
    AuthService,
    TypeOrmModule.forFeature(Object.values(entities)),
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(logger, UserMiddleware).forRoutes(UserController);
  }
}
