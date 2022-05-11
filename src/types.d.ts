import 'express';
import { SimplePayloadDto } from './contacts/contact.dto';
import { RequestPayload } from './users/entities/user.entity';
// test
declare module 'express' {
  export interface Request {
    simplePayload?: SimplePayloadDto | undefined | null;
    payload?: RequestPayload | undefined | null;
  }
}