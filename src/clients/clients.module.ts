import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '../config';
import { WORKER_SERVICE } from './worker.tokens';
// const WORKER_SERVICE = 'WORKER_SERVICE';

@Module({
  imports: [ConfigModule],
  providers: [{
    provide: WORKER_SERVICE,
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return ClientProxyFactory.create({
        transport: Transport.TCP, 
        options: {port: config.WORKER_PORT}
      })
    }
  }],
  exports: [WORKER_SERVICE],
})
export class ClientsModule {}
