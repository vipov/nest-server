import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { rename } from 'fs';
import { extname, join, resolve } from 'path';
const renameAsync = promisify(rename);
import * as crypto from 'crypto';
import * as sharp from 'sharp';
import { ConfigService } from '../../config';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoEntity } from '../entities';
import { UserEntity } from '../../user/entities';

@Injectable()
export class PhotosService {

  constructor(
    private config: ConfigService,

    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,

  ) { }


  async create(file, user: UserEntity) {

    // TODO walidacja czy plik to zdjęcie i czy ma poprawne rozszerzenie
    
    const fileName = crypto
      .createHash('md5')
      .update(file.path)
      .digest('hex') + extname(file.originalname).toLowerCase();
    await renameAsync(file.path, join(this.config.STORAGE_PHOTOS, fileName));

    const photo = new PhotoEntity();
    photo.filename = fileName;
    photo.description = file.originalname;
    photo.user = user;

    await this.photoRepository.save(photo);

    return {
      photo,
    };
  }

  async findAll() {
    return this.photoRepository.find();
  }

  async getByFileName(fileName: string) {
    return this.photoRepository.findOne({filename: fileName});
  }


  async createThumbs(filename) {

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
