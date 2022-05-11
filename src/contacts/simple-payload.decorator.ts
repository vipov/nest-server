import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// dekoratory: pobieraja dane z requestu

export const SimplePayload = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();

    return req.simplePayload;
  },
);
