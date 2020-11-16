import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '../../config';
import { AuthService } from '../services';

@Injectable()
export class UserMiddleware implements NestMiddleware {

  constructor(
    private config: ConfigService,
    private authService: AuthService,
  ) {}

  async use(req, res, next) {

    const token = req.headers[this.config.TOKEN_HEADER_NAME];
    
    if (token) {
      const payload = await this.authService.tokenVerify(token);
      if (payload) {
        req.tokenPayload = payload;
      }
    }

    next();
  }
}
