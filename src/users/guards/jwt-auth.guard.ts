import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RequestPayload, RoleNames } from '../entities/user.entity';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const token = this.extractToken(req);

    if (!token) {
      return false;
    }

    const payload = await this.decodeUser(token);

    if (!payload) {
      return false;
    }

    req.simplePayload = payload;

    // sprawdzenie ról
    const classRef = context.getClass();
    const methodRef = context.getHandler();

    const requiredRoles: RoleNames[] = this.reflector.getAllAndOverride(
      ROLE_KEY,
      [methodRef, classRef],
    );

    if (!requiredRoles) {
      return true;
    }

    const userRoles: RoleNames[] = (payload.roles || []).map(role => role.name);

    return !!requiredRoles.some((role) => userRoles.includes(role));
  }

  extractToken(req: Request): string {
    const token = req.headers.authorization;

    return token ? token.replace('Bearer ', '') : '';
  }

  async decodeUser(token: string): Promise<RequestPayload | null> {
    return this.authService.decodeUserToken(token)

    //TODO podmienic to i uzyc jakiegos serwisu by pobrac usera z bazy danych
    // if (token === 'admin') {
    //   return {
    //     id: 1,
    //     name: 'Admin Piotr',
    //     roles: [SimpleRoleNames.ADMIN],
    //   };
    // }

    // if (token === 'root') {
    //   return {
    //     id: 2,
    //     name: 'Root Piotr',
    //     roles: [SimpleRoleNames.ROOT],
    //   };
    // }

    return null;
  }
}
