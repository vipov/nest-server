import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ContactController } from './contacts/contact.controller';
// import { StorageService } from './storage/storage.service';
// import { StorageModule } from './storage/storage.module';
// import { LoggerModule } from './logger/logger.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [ContactsModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
