import { ExecutionContext } from "@nestjs/common"
import { UserEntity } from "../entities"
import { userDecoratorFactory } from "./user.decorator"

describe('User Decorator', () => {
  const user = {
    id: 1
  } as UserEntity

  const ctx = {
    switchToHttp: () => ({
      getRequest: () => ({
        tokenPayload: {user}
      })
    })
  } as ExecutionContext

  it('should return user', () => {
    expect(userDecoratorFactory({}, ctx)).toMatchObject(user);
  })

  const ctxEmpty = {
    switchToHttp: () => ({
      getRequest: () => ({
        tokenPayload: undefined
      })
    })
  } as ExecutionContext
  it('should return undefined', () => {
    expect(userDecoratorFactory({}, ctxEmpty)).toBeUndefined();
  })
})