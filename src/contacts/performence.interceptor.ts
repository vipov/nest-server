import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, of, tap } from 'rxjs';

@Injectable()
export class PerformenceInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // logic before
    const req = context.switchToHttp().getRequest();

    // zwracamy dane z cache
    if(req.url === '/user') {
      return of({type: 'data from cache'});
    }

    console.time('TIME')

    return next.handle().pipe(
      tap(res => {
        // logic after
        console.timeEnd('TIME')
      }),
      map(res => {
        // map the response data
        return res;
      })
    );
  }
}
