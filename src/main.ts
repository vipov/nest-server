import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // SWAGGER SETUP
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mój Projekt w Nest')
    .setDescription('Przykładowy projekt w Node.js i TypeScript')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, swaggerConfig, options);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: { persistAuthorization: true },
  };

  SwaggerModule.setup('docs', app, document, customOptions);
  // END OF SWAGGER SETUP

  await app.listen(3000);
}
bootstrap();
