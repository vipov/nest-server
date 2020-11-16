import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const req = context.switchToHttp().getRequest();

    // console.log('INTERCEPT BEFORE', req.tokenPayload)
    console.time('intercept');

    return next.handle().pipe(
      map(response => response.user),
      // tap(res => console.log('INTERCEPT AFTER', res)),
      // tap(res => console.timeEnd('intercept'))
    );

  }
}
