import { NestFactory } from "@nestjs/core";
import { writeFileSync } from "fs";
import { ConfigModule, ConfigService } from "../config";

(async function(){
  const app = await NestFactory.createApplicationContext(ConfigModule);
  const config = app.get(ConfigService)

  writeFileSync('ormconfig.json', JSON.stringify(config.ORMCONFIG, null, 2))
})()
