import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokenPayloadEntity } from '../entities';
import { ConfigService } from '../../config';

@Injectable()
export class AuthService {

  constructor(private config: ConfigService) {}

  tokenSign(payload: TokenPayloadEntity): string {
    return jwt.sign(payload, this.config.JWT_SECRET);
  }
  
  tokenDecode(token: string): TokenPayloadEntity | null {
    return jwt.decode(token);
  }

  tokenVerify(token: string): TokenPayloadEntity | null {
    try {
      return jwt.verify(token, this.config.JWT_SECRET);
    } catch (err) {
      return null;
    }
  }
}
