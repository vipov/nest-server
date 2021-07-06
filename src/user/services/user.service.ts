import { Injectable } from '@nestjs/common';
import { UserRegisterRequestDto } from '../dto';
import { UserEntity, UserRole } from '../entities';

@Injectable()
export class UserService {

  // dodajemy testowego usera
  users: UserEntity[] = [{
    id: 1,
    name: 'Piotr',
    email: 'piotr@myflow.pl',
    password: '123',
    roles: [UserRole.ADMIN],
  }];

  async findByCredentials(email: string, password: string): Promise<UserEntity> {
    return this.users.find(user => user.email === email && user.password === password);
  }

  async create(data: UserRegisterRequestDto): Promise<UserEntity> {
    
    const user: UserEntity = {
      id: this.users.length + 1,
      email: data.email,
      name: data.name,
      password: data.password,
      roles: [],
    };
    this.users.push(user);
    return user;
  }

  async getById(id: number): Promise<UserEntity | null> {
    const user = this.users.find(u => u.id === id);
    return (user) ? new UserEntity(user) : null;
  }
  
}
