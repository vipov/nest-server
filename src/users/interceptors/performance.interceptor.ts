import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const request = context.switchToHttp().getRequest();
    //TODO mutate request
    
    console.time('Request duration');

    return next.handle().pipe(
      // TODO mutate response
      map(response => response),
      tap(res => console.timeEnd('Request duration'))
    );
  }
}
