import { NestFactory } from "@nestjs/core";
import { statSync } from "fs";
import { join } from "path";
import {MigrationInterface, QueryRunner} from "typeorm";
import { ConfigModule, ConfigService } from "../../config";
import { PhotoEntity } from "../../photos/entities";

export class updatePhotoSize1625648524340 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const app = await NestFactory.createApplicationContext(ConfigModule);
        const config = app.get(ConfigService);

        const photos: PhotoEntity[] = await queryRunner.query('SELECT * FROM photo_entity WHERE size is null');
        for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];
            const stat = statSync(join(config.STORAGE_PHOTOS, photo.filename));
            await queryRunner.manager.update(PhotoEntity, photo.id, {size: stat.size})
        }
        // console.log('PHOTOS', photos)
        // throw new Error("STOP")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
