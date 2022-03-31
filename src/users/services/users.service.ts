import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { Role, RoleNames, User } from '../entities/user.entity';

export type UserQueryKeys = 'id' | 'name' | 'email';
// export type UserQuery = {[key in keyof User]: any};
// export type UserQuery = {[key in UserQueryKeys]?: any};
export type UserQuery = Partial<User>;

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    
    const user = this.userRepository.create(createUserDto);

    await this.userRepository.save(user);

    return user;
  }

  async findBy(query: UserQuery): Promise<User[]> {
    return this.userRepository.find({where: query});
  }

  async findAll(searchString?: string): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.update({ id }, updateUserDto).then(res => res.raw); 
  }

  async remove(id: number): Promise<boolean> {
    
    const user = await this.findOne(id);

    if(!user) {
      throw new NotFoundException('user not found')
    }

    await this.userRepository.remove([user]);

    return true;
  }
}
