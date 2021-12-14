import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestPayload, User } from '../entities/user.entity';
import { Request } from 'express';

export const Payload = createParamDecorator(
  (
    key: keyof RequestPayload,
    context: ExecutionContext,
  ): RequestPayload | RequestPayload[keyof RequestPayload] => {
    const request: Request = context.switchToHttp().getRequest();

    const payload: RequestPayload = request.payload;

    if (payload && key) {
      return payload[key];
    }

    return payload;
  },
);
