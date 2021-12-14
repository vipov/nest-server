import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { User, UserRoleName } from '../entities/user.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // TODO odczytac jwt token z request.headers i zwalidowac ten token

    // po prozkodawniu przypisac do request.payload info o sesji
    request.payload = {
      token: '',
      user: new User({
        id: 1,
        roles: [{ id: 1, name: UserRoleName.ADMIN }],
      }),
    };

    if (!request.payload) {
      return false;
    }

    const requiredRoles: UserRoleName[] = this.reflector.getAllAndOverride(
      ROLES_KEY,
      [context.getClass(), context.getHandler()],
    );

    const userRoles: UserRoleName[] = request.payload.user.roles.map(
      (role) => role.name,
    );

    return !!requiredRoles.some((role) => userRoles.includes(role));
  }
}
