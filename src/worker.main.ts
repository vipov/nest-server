import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from './config';
import { WorkerModule } from './worker/worker.module';

async function bootstrap() {

  const configApp = await NestFactory.createApplicationContext(ConfigModule);
  const config = configApp.get(ConfigService);

  const app = await NestFactory.createMicroservice(WorkerModule, {
    transport: Transport.TCP,
    options: {
      port: config.WORKER_PORT,
    },
  });
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
