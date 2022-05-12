import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { ConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [ContactsModule, ConfigModule, UsersModule, DbModule, PhotosModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
