import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap, fromEvent, takeUntil } from 'rxjs';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest();
    // TODO modify request

    const close$ = fromEvent(request, 'close');
    request.close$ = close$;

    console.time('Request duration')
    return next.handle().pipe(
      // TODO mutate response
      // map(res => res),
      tap(res => console.timeEnd('Request duration')),
      takeUntil(close$),
    );
  }
}
