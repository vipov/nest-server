import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { performance } from "perf_hooks";
// import { map } from 'rxjs/operators';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {

  constructor(private logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest();
    //TODO modify request

    console.time('Request duration')
    performance.mark('A')

    return next.handle().pipe(
      map(response => {
        //TODO modify response
        return response;
      }),
      tap(res => {
        console.timeEnd('Request duration')
        // performance.mark('B');
        // performance.measure('Duration', 'A', 'B')
        // const measure = performance.timerify('A', 'B')
        // this.logger.debug(measure);
      }),
      // catchError(err => of({status: 300, message: 'przechwycone przez interceptor'}))
    );
  }
}
