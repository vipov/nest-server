import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const req: Request = context.switchToHttp().getRequest();
    console.log('INTERCEPT BEFORE', req.payload);

    console.time('TIMER');
    return next.handle().pipe(
      map(res => res),
      tap(res => {
        console.log('INTERCEPT AFTER', res);
        console.timeEnd('TIMER');
      })
    );
  }
}
