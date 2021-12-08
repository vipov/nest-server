import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { UsersAdminController } from './controllers/users-admin.controller';
import { debuggerService } from "../express/server";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '../config';

export const DEBUG = 'debugger'

// const userServiceInstance = new UsersService();

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.JWT_SECRET,
        signOptions: {expiresIn: '4d'}
      })
    }),
  ],
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
