import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { PhotosService } from "../photos/services/photos.service";
import * as Table from 'cli-table';
import * as chalk from "chalk";

async function stats() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  const service = app.get(PhotosService);
  const photos = await service.findAll();

  console.log(chalk.green(`Found ${photos.length} photos in database`))
  
  var table = new Table({
    head: ['ID', 'File', 'Description']
  });

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    table.push([photo.id, photo.filename, photo.description || ''])
  }

  console.log(table.toString());
}
stats();