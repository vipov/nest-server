import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
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
