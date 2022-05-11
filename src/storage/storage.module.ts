import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { ConfigModule, ConfigService } from '../config';
import { StorageService } from './storage.service';
import { STORAGE_FILE } from './storage.tokens';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    {
      provide: StorageService,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log('CONFIG', config);
        const file = resolve(config.STORAGE_DIR, 'data.json');

        return new StorageService(file);
      },
    },
    {
      provide: STORAGE_FILE,
      useValue: './storage/data.json',
    },
  ],
  exports: [StorageService],
})
export class StorageModule {}
