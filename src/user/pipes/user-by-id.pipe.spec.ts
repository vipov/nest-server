import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entities';
import { UserService } from '../services';
import { UserByIdPipe } from './user-by-id.pipe';

describe('UserByIdPipe', () => {
  let pipe: UserByIdPipe;

  const user = {
    id: 1,
    name: 'Piotr'
  } as UserEntity

  const userService = {
    async getById(id: number) {
      return (id === 1) ? user : null;
    }
  } as UserService

  beforeAll(() => {
    pipe = new UserByIdPipe(userService);
  })

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should throw BadRequestException when non numeric string is provided', () => {
    expect(pipe.transform('sdf')).rejects.toThrow(BadRequestException);
  });

  it('should throw NotFoundException if user not found in db', () => {
    expect(pipe.transform('2')).rejects.toThrow(NotFoundException);
  });

  it('should return user', () => {
    expect(pipe.transform('1')).resolves.toEqual(user);
  });

});
