import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  // constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    console.log('INTERCEPT BEFORE', req.url);

    console.time('TIME');

    return next.handle().pipe(
      tap((res) => console.log('INTERCEPT AFTER', res)),
      tap(() => console.timeEnd('TIME')),
      map((res) => res.user),
      catchError((err) => of(['value from cache'])),
    );
  }
}
