import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestPayload, User } from '../entities';

export const Payload = createParamDecorator((data: unknown, context: ExecutionContext): User => {

  const request = context.switchToHttp().getRequest();

  const payload: RequestPayload = request.payload;

  return payload ? payload.user : undefined;
});
