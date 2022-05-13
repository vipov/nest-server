import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class IsImagePipe implements PipeTransform {
  async transform(file: Express.Multer.File, metadata: ArgumentMetadata) {

    const stats = await sharp(file.path).stats().catch(err => null);

    if(!stats) {
      throw new BadRequestException(`Uploaded file have to be image file`)
    }

    return file;
  }
}
