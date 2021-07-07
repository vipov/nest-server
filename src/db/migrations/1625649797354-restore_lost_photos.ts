import { NestFactory } from "@nestjs/core";
import { join } from "path";
import {MigrationInterface, QueryRunner} from "typeorm";
import { ConfigModule, ConfigService } from "../../config";
import { promisify } from 'util';
import { readdir, stat} from 'fs';
import { PhotoEntity } from "../../photos/entities";
const readdirAsync = promisify(readdir);
const statAsync = promisify(stat);

export class restoreLostPhotos1625649797354 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        const app = await NestFactory.createApplicationContext(ConfigModule);
        const config = app.get(ConfigService);

        const dir = join(config.STORAGE_ASSETS, 'photos');
        const files = await readdirAsync(dir);

        const photos: PhotoEntity[] = await queryRunner.query('SELECT * FROM photo_entity');

        const names = photos.map(p => p.filename)

        for (let i = 0; i < files.length; i++) {
            const name = files[i];

            if(names.indexOf(name) === -1) {
                const stat = await statAsync(join(config.STORAGE_PHOTOS, name));
                const photo = queryRunner.manager.create(PhotoEntity, {
                    filename: name,
                    description: '',
                    size: stat.size
                })
                await queryRunner.manager.save(photo);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
