import { TokenPayloadModel } from "./user/models";

declare module 'express' {
  export interface Request {
     tokenPayload?: TokenPayloadModel
  }
}
