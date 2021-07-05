import { Injectable } from '@nestjs/common';
import { UserRegisterRequestDto } from '../dto';
import { UserEntity } from '../entities';

@Injectable()
export class UserService {
  users: UserEntity[] = [];

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
}
