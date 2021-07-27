import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { LOGGER_SCOPE } from "../LOGGER_SCOPE";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  // logger = new Logger('UserModule | Middleware')

  constructor(
    private logger: Logger,

    @Inject(LOGGER_SCOPE)
    private scope: string,
  ) {}

  use(req: Request, res: any, next: () => void) {
    this.logger.debug(req.url);
    next();
  }
}
