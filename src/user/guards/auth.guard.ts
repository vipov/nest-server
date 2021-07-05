import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../entities';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('GUARD: Auth')
    const request = context.switchToHttp().getRequest();
    // mock
    // req.tokenPayload = {
    //   user: {
    //     id: 1,
    //     name: 'Piotr',
    //     roles: [UserRole.ADMIN],
    //   },
    // };

    if (!request.tokenPayload) {
      return false;
    }

    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const user = request.tokenPayload.user;
    const hasRole = () => !!user.roles.find(role => !!roles.find(item => item === role));

    if(!(user && user.roles && hasRole())) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
