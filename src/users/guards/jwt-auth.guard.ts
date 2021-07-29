import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Roles, User } from '../entities';
import { AuthService } from '../services';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request: Request = context.switchToHttp().getRequest()

    const token = this.extractToken(request);

    if(!token) {
      return false;
    }

    request.payload = await this.authService.decodeUserToken(token);

    if(!request.payload) {
      return false;
    }

    const handler = context.getHandler();
    const cls = context.getClass();

    const requiredRoles: Roles[] = this.reflector.getAllAndMerge(ROLES_KEY, [handler, cls]);

    if(requiredRoles.length === 0) {
      return true;
    }

    const userRoles = request.payload.user?.roles?.map(role => role.name) || [];

    return requiredRoles.some(role => userRoles.includes(role));
  }

  extractToken(request: Request) {

    let token = request.headers['authorization'];

    token = (token) ? token.replace('Bearer ', '') : '';

    if(!token && request.query.token) {
      return request.query.token + '';
    }

    return token;
  }
}
