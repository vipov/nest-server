import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestPayload, Roles, User } from '../entities';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  
  constructor(
    private reflector: Reflector,
    private authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();

    const token = this.extractToken(request);

    request.payload = await this.authService.decodeUserToken(token);

    if(!request.payload) {
      return false;
    }

    const requiredRoles = this.reflector.get<Roles[]>('roles', context.getHandler());
    
    if (!requiredRoles) {
      return true;
    }

    const userRoles = request.tokenPayload.user.roles.map(role => role.name);

    return requiredRoles.some((role) => userRoles?.includes(role));
  }

  extractToken(request) {
    const token = request.headers['authorization'];

    if(token) {
      return token.replace('Bearer ', '')
    }
  }
}
