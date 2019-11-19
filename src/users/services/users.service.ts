import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../models';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        email: 'piotr@myflow.pl',
        password: '123',
        name: 'Piotr',
        roles: [],
      },
      {
        id: 2,
        email: 'pawel@myflow.pl',
        password: '123',
        name: 'Paweł',
        roles: [],
      },
      {
        id: 3,
        email: 'adam@myflow.pl',
        password: '123',
        name: 'Adam',
        roles: [],
      },
    ];
  }

  async findAll() {
    return this.users;
  }

  async findById(id: number): Promise<User | null> {
    id = parseInt(id as any, 10);
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.email === username);
  }

  async register(user: User): Promise<User | undefined> {
    return user;
  }
}
