import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserRole } from '../entities';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req, res, next) {
    console.log('Middleware: ', req.url);
    next();
  }
}
