import { Module } from '@nestjs/common';
import { StorageModule } from 'src/storage/storage.module';
import { LoggerService } from './logger.service';
import { StorageLoggerService } from './store-logger.service';

// process.env.NODE_ENV === 'development'

@Module({
  imports: [StorageModule],
  providers: [
    {
      provide: LoggerService,
      useClass: process.env.NODE_ENV === 'development' ? LoggerService : StorageLoggerService 
    }
  ],
  exports: [LoggerService]
})
export class LoggerModule {}
