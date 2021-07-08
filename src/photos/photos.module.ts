import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '../config';
import { PhotosController } from './controllers/photos.controller';
import { PhotosService } from './services/photos.service';
import * as entities from './entities';
import { UserModule } from '../user/user.module';
import { DbModule } from '../db/db.module';
import { ClientsModule } from '../clients/clients.module';
@Module({
  imports: [
    ConfigModule,
    UserModule, 
    DbModule,
    ClientsModule,
    TypeOrmModule.forFeature(Object.values(entities)),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        dest: config.STORAGE_TMP,
      }),
    }),
  ],
  controllers: [PhotosController],
  providers: [PhotosService],
  exports: [PhotosService],
})
export class PhotosModule {}
