import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const req = context.switchToHttp().getRequest();

    console.log('INTERCEPT BEFORE')
    console.time('Execution time');

    return next.handle().pipe(
      // map(response => response.user),
      tap(res => console.log('INTERCEPT AFTER')),
      tap(res => console.timeEnd('intercept')),
      catchError(err => {
        console.log('INTERCEPTOR AFTER ERROR', err.message);
        console.timeEnd('Execution time');
        return of({message: 'błąd wyłapany w interceptorze'})
      })
    );

  }
}
