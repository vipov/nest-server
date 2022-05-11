import 'express';
import { SimplePayloadDto } from './contacts/contact.dto';

declare module 'express' {
  export interface Request {
    simplePayload?: SimplePayloadDto | undefined | null;
  }
}