import 'express';
import { SimplePayload } from './contacts/contact.dto';
declare module 'express' {
  export interface Request {
    simplePayload?: SimplePayload | undefined | null;
  }
}
