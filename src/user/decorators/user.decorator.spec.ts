import { userDecoratorFactory } from './user.decorator';
import * as express from 'express';
import { ExecutionContext } from '@nestjs/common';

describe('User Decorator', () => {
  
  const req: Partial<express.Request> = {
    tokenPayload: {
      user: {
        id: 1,
        name: 'Piotr',
      },
    },
  };

  const ctx: any = {
    switchToHttp() {
      return {
        getRequest() {
          return req;
        }
      }
    }
  }

  it('should return user from request', () => {
    expect(userDecoratorFactory({}, ctx as ExecutionContext)).toMatchObject(req.tokenPayload.user);
  });
  
  const ctx2: any = {
    switchToHttp() {
      return {
        getRequest() {
          return {};
        }
      }
    }
  }
  it('should return undefined request', () => {
    expect(userDecoratorFactory({}, ctx2 as ExecutionContext)).toBeUndefined();
  });
});
