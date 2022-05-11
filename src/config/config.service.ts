import { Injectable } from '@nestjs/common';
import { resolve } from 'path';

@Injectable()
export class ConfigService {
<<<<<<< HEAD
    STORAGE_DIR = resolve('./storage')
=======
  STORAGE_DIR = resolve('./storage');
>>>>>>> upstream/220509-nest
}
