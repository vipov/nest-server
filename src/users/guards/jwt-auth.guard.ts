import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RequestPayload, RoleNames } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const token = this.extractToken(req);

    if(!token) {
      throw new UnauthorizedException('Brak tokenu autoryzacyjnego');
    }

    const payload = await this.decodeUser(token);

    if(!payload) {
      throw new UnauthorizedException('Niepoprawny token autoryzacyjny');
    }

    req.payload = payload;

    // sprawdzenie ról
    const classRef = context.getClass();
    const methodRef = context.getHandler();

    const requiredRoles: RoleNames[] = this.reflector.getAllAndOverride(ROLES_KEY, [methodRef, classRef])

    if(!requiredRoles) {
      return true;
    }

    const userRoles: RoleNames[] = (payload.user.roles || []).map(role => role.name);

    return !!requiredRoles.some((role) => userRoles.includes(role));
  }

  extractToken(req: Request): string {

    const token = req.headers.authorization;

    return token ? token.replace('Bearer ', '') : '';
  }

  async decodeUser(token: string): Promise<RequestPayload | null> {
    return this.authService.decodeUserToken(token);
  }
}
