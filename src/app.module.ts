import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { PhotosModule } from './photos/photos.module';
import { DbModule } from './db/db.module';
import { ChatGateway } from './gateways/chat.gateway';
// import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    QuotesModule, 
    UserModule, 
    ConfigModule, 
    PhotosModule, 
    DbModule, 
    ClientsModule.register({port: 3001}),
    // ClientsModule.register([
    //   {name: WORKER_SERVICE, transport: Transport.TCP, options: {port: 3001}},
    //   // {name: VIDEO_SERVICE, transport: Transport.REDIS}
    // ])
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    ChatGateway,
  ],
})
export class AppModule {}
