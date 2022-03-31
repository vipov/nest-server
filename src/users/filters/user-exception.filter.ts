import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '../../config';

@Catch()
export class UserExceptionFilter implements ExceptionFilter {

  private logger = new Logger('Users Exception Filter', {timestamp: true});

  constructor(
    private config: ConfigService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest();
    const res: Response = ctx.getResponse();
    const status = exception.status || 500;
    const userId = req.payload?.user.id || null;

    const data = {
      statusCode: status,
      userId,
      path: req.url,
      errorStack: this.config.DEBUG ? exception.stack.split("\n") : null,
      errorMessage: this.config.DEBUG ? exception.message : null,
    };

    if(status >= 500) {
      this.logger.error({
        ...data,
        errorStack: exception.stack.split("\n"),
        errorMessage: exception.message,
       });
    } else {
      this.logger.log(data);
    }

    res.status(status).json(data);
  }
}
