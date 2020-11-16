require('dotenv').config();

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {app as expressApp} from '../express/app';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
const expressAdapter = new ExpressAdapter(expressApp);
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from './config';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, 
    expressAdapter
  );
  
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();
  app.enableCors();
  
  const config = app.get<ConfigService>(ConfigService);

  app.useStaticAssets(config.STORAGE_ASSETS);
  
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const options = new DocumentBuilder()
    .setTitle('Nest API Example')
    .setDescription('Przykładowy projekt w Node.js i TypeScript')
    .setVersion('1.0')
    .addTag('user')
    .addBearerAuth({type: 'apiKey', in: 'header', name: config.TOKEN_HEADER_NAME})
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}

bootstrap();
