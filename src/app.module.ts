import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactController } from './contacts/contact.controller';

@Module({
  imports: [],
  controllers: [AppController, ContactController],
  providers: [AppService],
  exports: []
})
export class AppModule {}
