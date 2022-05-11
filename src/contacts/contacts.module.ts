import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { ContactController } from './contact.controller';
import { StorageModule } from '../storage/storage.module';
import { LoggerModule } from '../logger/logger.module';
@Module({
  imports: [StorageModule, LoggerModule],
  controllers: [ContactController],
=======
import { LoggerModule } from '../logger/logger.module';
import { StorageModule } from '../storage/storage.module';
import { ContactsController } from './contact.controller';

@Module({
  imports: [StorageModule, LoggerModule],
  controllers: [ContactsController],
>>>>>>> upstream/220509-nest
  providers: [],
})
export class ContactsModule {}
