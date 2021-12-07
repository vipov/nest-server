import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { UsersAdminController } from './controllers/users-admin.controller';
import { debuggerService } from "../express/server";

export const DEBUG = 'debugger'

const userServiceInstance = new UsersService();

@Module({
  controllers: [UsersController, AuthController, UsersAdminController],
  providers: [
    // normal/simple
    UsersService, 
    // {
    //   provide: DEBUG,
    //   useValue: debuggerService,
    // },
    // // useClass
    // {
    //   provide: 'UsersService',
    //   useClass: process.env.NODE_ENV === 'dev' ? UsersServiceMock : UsersService,
    // },
    // // useValue
    // {
    //   provide: UsersService,
    //   useValue: userServiceInstance,
    // },
    // // useFactory
    // {
    //   provide: UsersService,
    //   useFactory: (config) => {
    //     return new UsersService({distFolder: config.DIST_DIR})
    //   },
    //   inject: [ConfigService]
    // },
    AuthService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
