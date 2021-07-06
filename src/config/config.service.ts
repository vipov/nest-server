import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  readonly JWT_SECRET = process.env.JWT_SECRET;
  readonly TOKEN_HEADER_NAME = process.env.TOKEN_HEADER_NAME;
}
