import { Injectable } from '@nestjs/common';
import { readdir, rename } from 'fs';
import { promisify } from "util";
const renameAsync = promisify(rename);
const readdirAsync = promisify(readdir);
import { join, extname } from 'path';
import { ConfigService, joinUrl } from '../../config';
import { createHash } from 'crypto';
import * as sharp from 'sharp';
import { Photo } from '../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities';
import { FileUploadDto } from '../controllers/photos.controller';

@Injectable()
export class PhotosService {

  constructor(
    private config: ConfigService,

    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>
  ) {}

  async create(file: Express.Multer.File, user: User, data: FileUploadDto) {

    const ext = extname(file.originalname).toLocaleLowerCase()

    const filename = createHash('md5').update(file.path).digest('hex') + ext;

    const destFile = join(this.config.STORAGE_PHOTOS, filename);

    await renameAsync(file.path, destFile);

    const photo = new Photo();
    photo.filename = filename;
    photo.originalname = file.originalname;
    photo.description = data.description;
    photo.user = user;

    await this.photosRepository.save(photo);

    return photo;
  }

  async createThumbs(filename: string) {

    const srcFile = join(this.config.STORAGE_PHOTOS, filename);
    const destFile = join(this.config.STORAGE_THUMBS, filename);

    await sharp(srcFile)
      .rotate()
      .resize(200, 200, {fit: 'cover', position: 'attention'})
      .jpeg({quality: 100})
      .toFile(destFile);

    return {
      small: destFile
    }
  }

  async findAll() {

    const files = await this.photosRepository.find();
    
    // const files = await readdirAsync(this.config.STORAGE_THUMBS)

    return files.map((photo) => ({
      ...photo,
      thumbUrl: joinUrl(this.config.PHOTOS_BASE_PATH, photo.filename),
      downloadUrl: joinUrl(this.config.PHOTOS_DOWNLOAD_PATH, photo.filename),
    }));
  }

  async findByFilename(filename: string) {
    return this.photosRepository.findOne({filename});
  }
}
