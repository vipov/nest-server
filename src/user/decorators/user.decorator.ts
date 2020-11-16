import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as express from 'express';

export function userDecoratorFactory(data: unknown, ctx: ExecutionContext) {
  const req: express.Request = ctx.switchToHttp().getRequest();
  return (req.tokenPayload && req.tokenPayload.user) ? req.tokenPayload.user : undefined;
}

export const User = createParamDecorator(userDecoratorFactory);
