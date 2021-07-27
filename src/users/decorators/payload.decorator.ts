import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestPayload, User } from '../entities';

export type ValueOf<T> = T[keyof T];

export type Values = RequestPayload[keyof RequestPayload];

export const Payload = createParamDecorator((key: keyof RequestPayload, context: ExecutionContext): Values | RequestPayload => {

  const request = context.switchToHttp().getRequest();

  const payload: RequestPayload = request.payload;

  if(payload && key) {
    return payload[key];
  }

  return payload;
});
