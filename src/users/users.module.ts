import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { UsersAdminController } from './controllers/users-admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '../config';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema, User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.JWT_SECRET,
        signOptions: { expiresIn: '4d' },
      }),
    }),
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController, AuthController, UsersAdminController],
  providers: [UsersService, AuthService],
  exports: [AuthService],
})
export class UsersModule {}
