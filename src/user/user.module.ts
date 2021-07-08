import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserMiddleware } from './middlewares/user.middleware';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ConfigModule } from '../config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../shared/http-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { UserRoleEntity } from './entities/user-role.entity';
import { DbModule } from '../db/db.module';
// import * as entities from './entities';

const orm = TypeOrmModule.forFeature([UserEntity, UserRoleEntity]);

@Module({
  imports: [ConfigModule, orm],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [orm, AuthService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(UserController);
  }
}
