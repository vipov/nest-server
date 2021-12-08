import { ArgumentsHost, Catch, ExceptionFilter, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '../../config';

@Catch()
// @Catch(InternalServerErrorException, NotFoundException)
export class UserExceptionFilter<T> implements ExceptionFilter {

  constructor(
    private config: ConfigService
  ) {}

  catch(exception, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.status || 500;
    const userId = request?.payload?.user?.id || null;

    let data = {
      statusCode: status,
      userId,
      errorStack: this.config.DEBUG ? exception.stack : null,
      errorMessage: this.config.DEBUG ? exception.message : null,
    }

    // TODO internal logger 

    response.status(status).json(data);
  }
}
