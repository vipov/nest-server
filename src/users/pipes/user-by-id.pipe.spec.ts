import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../entities';
import { UsersService } from '../services';
import { UserByIdPipe } from './user-by-id.pipe';

describe('UserByIdPipe', () => {
  let pipe: UserByIdPipe;

  const user = new User({
    id: 1
  });

  const userServiceMock = {
    async findOne(id: number): Promise<User | null> {
      return (id === 1) ? user : null;
    }
  } as UsersService

  beforeAll(() => {
    pipe = new UserByIdPipe(userServiceMock);
  })

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should return User', () => {
    expect(pipe.transform('1', undefined)).resolves.toMatchObject(user);
  });

  it('should throw BadRequestException', () => {
    expect(pipe.transform('dfgdf', undefined)).rejects.toThrow(BadRequestException);
  });

  it('should throw NotFoundException', () => {
    expect(pipe.transform('2', undefined)).rejects.toThrow(NotFoundException);
  });
});
