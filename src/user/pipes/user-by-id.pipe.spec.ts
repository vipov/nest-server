import { UserByIdPipe } from './user-by-id.pipe';
import { NotFoundException } from '@nestjs/common';
import { UserService } from '../services';

describe('UserByIdPipe', () => {

  const user = {
    id: 1,
    name: 'Piotr',
  };

  const userServiceMock: Partial<UserService> = {
    async getById(id: number) {
      if (id !== 1) {
        return new Promise(resolves => {
          setTimeout(() => resolves(null), 1000)
        });
      }
      return new Promise(resolves => {
        setTimeout(() => resolves(user), 1000)
      });
    },
  };
  let pipe: UserByIdPipe;

  beforeAll(() => {
    pipe = new UserByIdPipe(userServiceMock as UserService);
  });

  it('should throw NotFoundException CALLBACK', (done) => {
    expect(pipe.transform('1', undefined)).resolves.toMatchObject(user).then(done);
  });

  it('should throw NotFoundException ASYNC', async () => {
    await expect(pipe.transform('1', undefined)).resolves.toMatchObject(user);
  });

  it('should throw NotFoundException Async + return', async () => {
    return expect(pipe.transform('1', undefined)).resolves.toMatchObject(user);
  });

  it('should throw NotFoundException Promise', () => {
    return expect(pipe.transform('1', undefined)).resolves.toMatchObject(user);
  });

  it('should return null', (done) => {
    expect(pipe.transform('2', undefined)).rejects.toThrow(NotFoundException).then(done);
  });
});

async function fetchUser(): Promise<User> {
  return {id: 1, name: 'Piotr'};
}

interface User {
  id: number;
  name: string;
}

// async/await
async function getByIdAsync(id: number): Promise<User> {

  const user = await fetchUser();

  return {id, name: user.name}
}

// function
function getById(id: number): Promise<User> {
  return new Promise((resolves, rejects) => {
    fetchUser().then(user => {
      resolves({id, name: user.name});
    })
  });
}
