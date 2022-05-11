import { Module } from '@nestjs/common';
import { StorageModule } from '../storage/storage.module';
import { LoggerService } from './logger.service';
import { StorageLoggerService } from './storage-logger.service';

@Module({
  imports: [StorageModule],
  providers: [
    {
      provide: LoggerService,
      useClass: process.env.NODE_ENV === 'development' ? LoggerService : StorageLoggerService,
    }
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
