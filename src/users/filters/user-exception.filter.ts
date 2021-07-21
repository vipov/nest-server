import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class UserExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
