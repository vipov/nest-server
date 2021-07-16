import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestPayload, Roles, User } from '../entities';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();
    
    //TODO pobieramy api token i dekodujemy jego wartości
    request.payload = {
      user: new User({
        id: 1,
        name: 'Piotr',
        roles: [{id: 1, name: Roles.ADMIN}]
      })
    } as RequestPayload;

    const requiredRoles = this.reflector.get<Roles[]>('roles', context.getHandler());
    
    if (!requiredRoles) {
      return true;
    }

    const userRoles = request.tokenPayload.user.roles.map(role => role.name);

    return requiredRoles.some((role) => userRoles?.includes(role));
  }
}
