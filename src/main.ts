require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { expressApp } from './express/server';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from './config';
import { join } from 'path';

const expressAdapter = new ExpressAdapter(expressApp);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    expressAdapter,
  );

  app.enableShutdownHooks();
  app.setGlobalPrefix('api');

  // const config = new ConfigService();
  const config = app.get(ConfigService);
  // const config2 = app.get('WORKER_SERVICE');
  // (ref1 === ref2) // true/false

  app.useStaticAssets(config.STORAGE_ASSETS);

  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('hbs');

  const options = new DocumentBuilder()
    .setTitle('Nest API Example')
    .setDescription('Przykładowy projekt w Node.js i TypeScript')
    .setVersion('1.0')
    .addTag('user')
    .addBearerAuth({
      type: 'apiKey',
      in: 'header',
      name: config.TOKEN_HEADER_NAME,
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
