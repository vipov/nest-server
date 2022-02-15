import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RequestPayload, User } from '../entities/user.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(req);

    if (!token) {
      return false;
    }

    req.payload = {
      user: new User({ id: 55, name: 'fake User' }),
    } as RequestPayload;

    return true;
  }

  extractToken(req: Request): string {
    return 'sdfsdfdsf';
  }
}
