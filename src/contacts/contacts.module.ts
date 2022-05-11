import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { StorageModule } from '../storage/storage.module';
import { ContactsController } from './contact.controller';

@Module({
  imports: [StorageModule, LoggerModule],
  controllers: [ContactsController],
  providers: [],
})
export class ContactsModule {}
