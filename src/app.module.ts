import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [QuotesModule, UserModule, ConfigModule, PhotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
