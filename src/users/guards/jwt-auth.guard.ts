import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RoleNames, User } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const handler = context.getHandler();
    const cls = context.getClass();

    // TODO delode JWT token
    req.payload = {
      user: new User({
        id: 1,
        name: 'Piotr',
        roles: [{id: 1, name: RoleNames.ADMIN }]
      }),
    }

    return !!req.payload;
  }
}
