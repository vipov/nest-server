import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [QuotesModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
