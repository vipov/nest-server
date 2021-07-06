import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export function userDecoratorFactory (data: unknown, ctx: ExecutionContext) {
  const req = ctx.switchToHttp().getRequest();

  console.log('DECORATOR User');

  return req.tokenPayload && req.tokenPayload.user
    ? req.tokenPayload.user
    : undefined;
};

export const User = createParamDecorator(userDecoratorFactory);
