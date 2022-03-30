import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import * as sharp from 'sharp';

export interface Options {
  type?: string
}

@Injectable()
export class IsImagePipe implements PipeTransform {

  options: Options = {
    type: 'image'
  }

  constructor(
    options: Options = {}
  ) {
    Object.assign(this.options, options);
  }

  async transform(file: Express.Multer.File, metadata: ArgumentMetadata) {

    const type = file.mimetype.split('/')[0];

    if(type !== this.options.type) {
      throw new UnprocessableEntityException(`File is not an supported image format`)
    }

    const stats = await sharp(file.path)
      .stats()
      .catch(e => null);

    if(!stats) {
      throw new UnprocessableEntityException(`File is not an supported image format`)
    }

    return file;
  }
}
