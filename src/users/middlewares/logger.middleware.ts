import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  // logger = new Logger()

  constructor(
    private logger: Logger
  ) {}

  use(req: Request, res: any, next: () => void) {
    this.logger.debug(req.url);
    next();
  }
}
