import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokenPayloadModel } from '../models';
import { ConfigService } from '../../config';

@Injectable()
export class AuthService {

  constructor(private config: ConfigService) {}

  tokenSign(payload: TokenPayloadModel): string {
    return jwt.sign(payload, this.config.JWT_SECRET);
  }
  tokenDecode(token: string): TokenPayloadModel | null {
    return jwt.decode(token);
  }
  tokenVerify(token: string): TokenPayloadModel | null {
    try {
      return jwt.verify(token, this.config.JWT_SECRET);
    } catch (err) {
      return null;
    }
  }
}
