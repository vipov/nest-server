import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { expressApp } from "./express/server";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";

const expressAdapter = new ExpressAdapter(expressApp);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, expressAdapter);
  await app.listen(3000);
} 
bootstrap();
