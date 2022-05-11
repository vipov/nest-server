import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { StorageModule } from 'src/storage/storage.module';
import { LoggerService } from './logger.service';
import { StorageLoggerService } from './store-logger.service';

// process.env.NODE_ENV === 'development'
=======
import { StorageModule } from '../storage/storage.module';
import { LoggerService } from './logger.service';
import { StorageLoggerService } from './storage-logger.service';
>>>>>>> upstream/220509-nest

@Module({
  imports: [StorageModule],
  providers: [
    {
      provide: LoggerService,
<<<<<<< HEAD
      useClass:
        process.env.NODE_ENV === 'development'
          ? LoggerService
          : StorageLoggerService,
    },
=======
      useClass: process.env.NODE_ENV === 'development' ? LoggerService : StorageLoggerService,
    }
>>>>>>> upstream/220509-nest
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
