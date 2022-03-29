import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleNames, User } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const handler = context.getHandler();
    const cls = context.getClass();

    // extract api token
    const token = this.extractToken(req);
    if(!token) {
      throw new UnauthorizedException();
    }

    // TODO decode & validate api token
    req.payload = {
      user: new User({
        id: 1,
        name: 'Piotr',
        roles: [{id: 1, name: RoleNames.ADMIN }]
      }),
    }

    if(!req.payload) {
      throw new UnauthorizedException();
    }

    // read roles from @Roles() decorator
    const requiredRoles: RoleNames[] = this.reflector.getAllAndOverride(ROLES_KEY, [handler, cls]);

    if(!requiredRoles) {
      return true;
    }

    // read user roles
    const userRoles: RoleNames[] = req.payload.user.roles.map(r => r.name);

    return !!requiredRoles.some((role) => userRoles.includes(role));
  }

  extractToken(req: Request): string {
    const token = req.headers.authorization;

    return token ? token.replace('Bearer ', '') : '';
  }
}
