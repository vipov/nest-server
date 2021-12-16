import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker/worker.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(WorkerModule, {
    transport: Transport.TCP,
    options: { port: 3001 },
  });

  await app
    .listen()
    .then(() => console.log('Microservice Worker is running on 3001'));
}
bootstrap();
