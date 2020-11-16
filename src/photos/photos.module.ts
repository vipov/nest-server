import { Module } from '@nestjs/common';
import { PhotosController } from './controllers/photos.controller';
import { PhotosService } from './services/photos.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './entities';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    TypeOrmModule.forFeature(Object.values(entities)),
    MulterModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        dest: config.STORAGE_TMP,
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
