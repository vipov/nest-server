import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { ConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './user/controllers/auth.controller';

@Module({
  imports: [ContactsModule, ConfigModule, UsersModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
