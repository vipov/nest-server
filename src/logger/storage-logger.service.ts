import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { Log } from './log.entity';
import { LoggerService } from './logger.service';

@Injectable()
export class StorageLoggerService extends LoggerService {
  constructor(private storage: StorageService) {
    super();
  }

  warn(message: any, context?: any, ...rest: any[]): void {
    this.storage.create(Log, { type: 'warn', message, context, rest });
  }
  log(message: any, context?: any, ...rest: any[]): void {
    this.storage.create(Log, { type: 'log', message, context, rest });
  }
}
