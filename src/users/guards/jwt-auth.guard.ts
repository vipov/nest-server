import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RequestPayload, RoleNames, User } from '../entities/user.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(req);

    // pobranie, dekodowanie i validowanie api token
    if (!token) {
      throw new UnauthorizedException();
    }

    //TODOO validate & decode api token
    req.payload = {
      user: new User({
        id: 55,
        name: 'fake User',
        roles: [{ id: 1, name: RoleNames.ROOT }],
      }),
    } as RequestPayload;

    if (!req.payload) {
      throw new UnauthorizedException();
    }

    // odczytac role z dekoratora @Roles()
    const requiredRoles: RoleNames[] = this.reflector.getAllAndOverride(ROLES_KEY, [context.getClass(), context.getHandler()]);

    if (!requiredRoles) {
      return true;
    }

    // sprawdzic jakie user ma role
    const userRoles: RoleNames[] = req.payload.user.roles.map((role) => role.name);

    // czy use ma wystarczajace uprawnienia
    return !!requiredRoles.some((role) => userRoles.includes(role));
  }

  extractToken(req: Request): string {
    return 'sdf';
  }
}
