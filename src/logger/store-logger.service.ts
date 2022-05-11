import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { Log } from './log.entity';
import { StorageService } from '../storage/storage.service';
@Injectable()
export class StorageLoggerService extends LoggerService {
  constructor(private storage: StorageService) {
    super();
  }

  warn(message: any, context?: any, ...rest: any[]): void {
    this.storage.create(Log, { message, context, rest });
  }
  log(message: any, context?: any, ...rest: any[]): void {
    this.storage.create(Log, { message, context, rest });
  }
}
