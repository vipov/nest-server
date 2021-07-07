import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { rename, readdir } from 'fs';
import { extname, join, posix } from 'path';
const renameAsync = promisify(rename);
const readdirAsync = promisify(readdir);
import * as crypto from 'crypto';
import { ConfigService } from '../../config';
import { resolve } from 'path';
import * as sharp from 'sharp';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoEntity } from '../entities';

@Injectable()
export class PhotosService {
  constructor(
    private config: ConfigService,

    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
  ) {}

  async findAll() {
    const dir = join(this.config.STORAGE_ASSETS, 'photos');
    // const files = await readdirAsync(dir);
    let files = await this.photoRepository.find()//.then(p => p.map(e => e.filename))
    // files = files.map(e => e.filename)

    return files.map(({filename: name}) => ({
      filename: name,
      thumbPath: [this.config.PHOTOS_BASE_PATH, name].join('/'),
      downloadPath: [this.config.PHOTOS_DOWNLOAD_PATH, name].join('/'),
    }));
  }

  async create(file: Express.Multer.File) {
    // TODO validate is photo

    const fileName =
      crypto.createHash('md5').update(file.path).digest('hex') +
      extname(file.originalname).toLowerCase();

    await renameAsync(file.path, join(this.config.STORAGE_PHOTOS, fileName));

    
    const photo = new PhotoEntity();
    photo.filename = fileName;
    photo.size = file.size;
    photo.description = file.originalname;

    await this.photoRepository.save(photo);

    return {
      fileName,
      photo,
    };
  }

  async createThumbs(filename: string) {
    const sourceFile = resolve(this.config.STORAGE_PHOTOS, filename);
    const destFile = resolve(this.config.STORAGE_THUMBS, filename);

    await sharp(sourceFile)
      .rotate()
      .resize(200, 200, { fit: 'cover', position: 'attention' })
      .jpeg({
        quality: 100,
      })
      .toFile(destFile);

    return {
      thumbName: destFile,
    };
  }
}
