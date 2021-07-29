import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '../config';
import { DbModule } from '../db/db.module';
import { UsersModule } from '../users/users.module';
import { PhotosController } from './controllers/photos.controller';
import { Photo } from './entities';
import { PhotosService } from './services/photos.service';

@Module({ 
  imports: [
    DbModule,
    UsersModule,
    TypeOrmModule.forFeature([Photo]),
    ConfigModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dest: config.STORAGE_TMP
      })
    })
  ],
  controllers: [PhotosController],
  providers: [PhotosService],
  exports: [PhotosService],
})
export class PhotosModule {}
