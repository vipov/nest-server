import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, map } from 'rxjs';

@Injectable()
export class PerformenceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // logic before
    const req = context.switchToHttp().getRequest();
    console.time('PERFORM');

    if (false) {
      return of({ type: 'data from cache' });
    }

    return next.handle().pipe(
      tap((res) => {
        // logic after
        console.timeEnd('TIME');
      }),
      map((res) => {
        // map the response data
        return res;
      }),
    );
  }
}
