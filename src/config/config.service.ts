import { Injectable } from '@nestjs/common';
import { resolve } from 'path';

@Injectable()
export class ConfigService {
    STORAGE_DIR = resolve('./storage')
}
