import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Roles, User } from '../entities';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request: Request = context.switchToHttp().getRequest()

    // todo decode jwt token -> add payload to request

    request.payload = {
      user: new User({
        id: 1,
        roles: [{id: 1, name: Roles.ADMIN}]
      })
    }

    const handler = context.getHandler();

    const requiredRoles: Roles[] = this.reflector.get(ROLES_KEY, handler);

    if(!requiredRoles) {
      return true;
    }

    const userRoles = request.payload.user.roles.map(role => role.name);

    return requiredRoles.some(role => userRoles.includes(role));
  }
}
