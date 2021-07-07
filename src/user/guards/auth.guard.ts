import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '../../config';
import { UserRole } from '../entities';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private config: ConfigService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('GUARD: Auth');
    const request = context.switchToHttp().getRequest();

    const token = request.headers[this.config.TOKEN_HEADER_NAME];

    if (token) {
      const payload = await this.authService.tokenVerify(token);
      if (payload) {
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
      !!user.roles.find((role) => !!roles.find((item) => item === role.name));

    if (!(user && user.roles && hasRole())) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
