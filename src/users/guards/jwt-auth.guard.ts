import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestPayload, User } from '../entities/user.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // TODO pobieramy api token z headers i go validujemy

    request.payload = {
      user: new User({
        name: 'Tymczasowy User',
      }),
    } as RequestPayload;

    return !!request.payload;
  }
}
