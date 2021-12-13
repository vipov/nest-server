import 'express';
// import * as express from 'express';

declare module 'express' {
  export interface Request {
    userName: string;
  }
}