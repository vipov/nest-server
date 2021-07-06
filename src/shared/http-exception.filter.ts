import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

export class TimeoutException extends HttpException {
  timeout: number;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.status || 500;

    console.log('EXCEPTION FILTER', exception.message);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      data: process.env.DEBUG ? exception.message : null,
      stack: process.env.DEBUG ? exception.stack : null,
    });
  }
}
