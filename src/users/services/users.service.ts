import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        username: 'piotr',
        password: '123',
      },
      {
        id: 2,
        username: 'admin',
        password: 'secret',
      },
      {
        id: 3,
        username: 'root',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
