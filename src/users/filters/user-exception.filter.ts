import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '../../config';

@Catch()
export class UserExceptionFilter implements ExceptionFilter {
  private logger = new Logger('Users Exception Filter', { timestamp: true });

  constructor(private config: ConfigService) {}

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const response = ctx.getResponse();

    const status = exception.status || 500;
    const userId = request?.payload?.user.id || null;

    const data = {
      statusCode: status,
      userId,
      path: request.url,
      errorStack: this.config.DEBUG ? exception.stack : null,
      errorMessage: this.config.DEBUG ? exception.message : null,
    };

    this.logger.error(data);

    response.status(status).json(data);
  }
}
