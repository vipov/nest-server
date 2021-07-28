import { ExecutionContext } from "@nestjs/common";
import { User } from "../entities"
import { authDecoratorFactory } from "./auth.decorator"

describe('auth decorator', () => {

  const user = {id: 1} as User;

  const ctx = {
    switchToHttp: () => ({
      getRequest: () => ({
        payload: {user}
      })
    })
  } as ExecutionContext
  const ctx2 = {
    switchToHttp: () => ({
      getRequest: () => ({
        
      })
    })
  } as ExecutionContext

  it('should return user', () => {
    expect(authDecoratorFactory({}, ctx)).toMatchObject(user)
  })

  it('should return undefined', () => {
    expect(authDecoratorFactory({}, ctx2)).toBeUndefined()
  })
})