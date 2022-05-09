import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
<<<<<<< HEAD
import { NestExpressApplication } from '@nestjs/platform-express';
=======
>>>>>>> upstream/220509-nest
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
<<<<<<< HEAD
  // SWAGGER SETUP
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mój Projekt w Nest')
    .setDescription('Przykładowy projekt w Node.js i TypeScript')
    .setVersion('1.0')
    .build();
=======

  // SWAGGER SETUP
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Mój Projekt w Nest')
  .setDescription('Przykładowy projekt w Node.js i TypeScript')
  .setVersion('1.0')
  .build();
>>>>>>> upstream/220509-nest

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, swaggerConfig, options);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: { persistAuthorization: true },
  };

  SwaggerModule.setup('docs', app, document, customOptions);
  // END OF SWAGGER SETUP

<<<<<<< HEAD
=======

>>>>>>> upstream/220509-nest
  await app.listen(3000);
}
bootstrap();
