import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../entities/user.entity';

export const Auth = createParamDecorator((data: unknown, context: ExecutionContext): User => {
  const req: Request = context.switchToHttp().getRequest();

  return req.payload ? req.payload.user : null;
});
