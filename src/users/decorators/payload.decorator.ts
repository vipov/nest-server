import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestPayload } from '../entities';

export const Payload = createParamDecorator((data: keyof RequestPayload, context: ExecutionContext): RequestPayload | RequestPayload[keyof RequestPayload] => {

  const request = context.switchToHttp().getRequest();

  const payload: RequestPayload = request.payload;

  if(payload && data) {
    return payload[data];
  }

  return payload;
});
