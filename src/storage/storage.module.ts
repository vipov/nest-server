import { Module } from '@nestjs/common';
import { resolve } from 'path';
<<<<<<< HEAD
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
=======
import { ConfigModule, ConfigService } from '../config';
>>>>>>> upstream/220509-nest
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
<<<<<<< HEAD
        const file = resolve(config.STORAGE_DIR, 'data.json');
        return new StorageService(file);
      },
    },

    {
      provide: STORAGE_FILE,
      useValue: './storage/data.json',
    },
=======

        const file = resolve(config.STORAGE_DIR, 'data.json');
        
        return new StorageService(file);
      }
    },
    {
      provide: STORAGE_FILE,
      useValue: './storage/data.json'
    }
>>>>>>> upstream/220509-nest
  ],
  exports: [StorageService],
})
export class StorageModule {}
