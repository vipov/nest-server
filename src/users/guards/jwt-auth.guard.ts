import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RequestPayload, User, UserRoleName } from '../entities/user.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(
    private reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // TODO pobieramy api token z headers i go validujemy

    request.payload = {
      user: new User({
        name: 'Tymczasowy User',
        roles: [{id: 1, name: UserRoleName.ADMIN}]
      }),
    } as RequestPayload;

    if(!request.payload) {
      return false;
    }

    const requiredRoles: UserRoleName[] = this.reflector.getAllAndOverride('roles', [context.getClass(), context.getHandler()]);

    if(!requiredRoles) {
      return true;
    }

    const userRoles: UserRoleName[] = request.payload.user.roles.map(role => role.name);

    return requiredRoles.some(role => userRoles.includes(role));
  }
}
