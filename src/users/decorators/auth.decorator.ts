import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const SimplePayload = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();

    return req.payload ? req.payload.user : null;
  },
);
