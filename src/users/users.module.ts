import { Module } from '@nestjs/common';
import { HttpModule, HttpService} from '@nestjs/common/http';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '../config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UserExceptionFilter } from './filters/user-exception.filter';
import { PerformanceInterceptor } from './interceptors/performance.interceptor';

export class MyMockUserService extends UsersService {
  constructor() {
    super();
    this.users = [];
    this.roles = []
  }
}

@Module({
  imports: [
    ConfigModule,
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '3d' }
    // }), 
    JwtModule.registerAsync({
      imports: [ConfigModule, HttpModule],
      inject: [ConfigService, HttpService],
      useFactory: async (config: ConfigService, http: HttpService) => {
        // const conf = await http.get('/config.json')
        return { 
          secret: config.JWT_SECRET,
          signOptions: { expiresIn: '3d' }
        }
      }
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    AuthService,
    {
      provide: UsersService,
      useClass: process.env.NODE_ENV === 'dev' ? MyMockUserService : UsersService,
    }, 
    {
      provide: APP_FILTER,
      useClass: UserExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PerformanceInterceptor,
    },
  ],
  exports: [UsersService, AuthService],
})
export class UsersModule {}
