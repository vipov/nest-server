import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRoleName } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = this.extractToken(request);
    console.log('TOKEN', token);
    if (!token) {
      return false;
    }

    request.payload = await this.authService.decodeUserToken(token);
    console.log('payload', request.payload);
    if (!request.payload) {
      return false;
    }

    const requiredRoles: UserRoleName[] = this.reflector.getAllAndOverride(
      ROLES_KEY,
      [context.getClass(), context.getHandler()],
    );

    if (!requiredRoles) {
      return true;
    }

    const userRoles: UserRoleName[] = request.payload.user.roles.map(
      (role) => role.name,
    );

    return !!requiredRoles.some((role) => userRoles.includes(role));
  }

  extractToken(request: Request) {
    const token = request.headers['authorization'] as string;

    return token ? token.replace('Bearer ', '') : '';
  }
}
