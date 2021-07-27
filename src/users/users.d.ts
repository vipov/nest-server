import { RequestPayload } from "./entities";

declare module 'express' {
  export interface Request {
    payload?: RequestPayload
  }
}