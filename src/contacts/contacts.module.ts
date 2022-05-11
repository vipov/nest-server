import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { StorageModule } from '../storage/storage.module';
import { LoggerModule } from '../logger/logger.module';
@Module({
  imports: [StorageModule, LoggerModule],
  controllers: [ContactController],
  providers: [],
})
export class ContactsModule {}
