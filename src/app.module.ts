import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
// import { ContactController } from './contacts/contact.controller';
// import { StorageService } from './storage/storage.service';
// import { StorageModule } from './storage/storage.module';
// import { LoggerModule } from './logger/logger.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [ContactsModule],
=======
import { ContactsModule } from './contacts/contacts.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ContactsModule, ConfigModule],
>>>>>>> upstream/220509-nest
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
