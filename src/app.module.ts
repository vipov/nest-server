import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { PhotosModule } from './photos/photos.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    PhotosModule,
    MongooseModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        uri: 'mongodb://localhost:27017/nest-db',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
