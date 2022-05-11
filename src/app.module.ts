import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ContactsModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
