import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ConfigService } from '../../config';

@Catch()
export class UserExceptionFilter implements ExceptionFilter {

  constructor(
    private config: ConfigService
  ) {}

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status = exception.status || 500;
    const userId = request?.payload?.user?.id || null;

    //TODO logowanie do jakiegoś systemu
    
    const data = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      userId,
      errorMessage: this.config.DEBUG ? exception.message : null,
      errorStack: this.config.DEBUG ? exception.stack : null
    }

    response.status(status).json(data)
  }
}
