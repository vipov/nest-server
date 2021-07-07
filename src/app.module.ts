import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { PhotosModule } from './photos/photos.module';
import { DbModule } from './db/db.module';
import { ChatGateway } from './gateways/chat.gateway';

@Module({
  imports: [QuotesModule, UserModule, ConfigModule, PhotosModule, DbModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
