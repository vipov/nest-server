import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import {
  of,
  Observable,
  fromEvent,
  map,
  takeUntil,
  tap,
  Subject,
  endWith,
  startWith,
} from 'rxjs';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [req]: [Request] = context.getArgs();

    // modyfikacja requestu
    // req.payload.extraStuff = 'extra';

    // TODO BEFORE
    console.time('TIME');

    // check cache if exists
    // if (cacheExists) {
    //   return of('data from cache');
    // }

    // const close$ = new Subject();
    // req.on('close', (e) => {
    //   console.log('REQUEST CANCELED', e);
    //   close$.next(e);
    // });

    const close$ = fromEvent(req, 'close');

    return next.handle().pipe(
      tap((res) => console.timeEnd('TIME')), // do something after controller response
      map((res) => res), // TODO AFTER you can map the response
      takeUntil(close$),
      startWith(''),
    );
  }
}
