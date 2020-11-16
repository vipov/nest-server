import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ConfigService } from '../../config';
import { UserEntity } from '../entities';
import { UserRole } from '../models';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private config: ConfigService,
    private authService: AuthService,
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();
    // const request = context.switchToWs();

    const token = request.headers[this.config.TOKEN_HEADER_NAME] as string;
    
    if (token) {
      const payload = await this.authService.tokenVerify(token);
      if (payload) {
        payload.user = UserEntity.create(payload.user);
        request.tokenPayload = payload;
      }
    }

    if (!request.tokenPayload) {
      return false;
    }
    
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const user = request.tokenPayload.user;
    const hasRole = () =>
      !!user.roles.find(role => !!roles.find(item => item === role.name));
    return user && user.roles && hasRole();
  }
}
