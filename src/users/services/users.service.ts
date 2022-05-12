import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

  constructor(

    @InjectRepository(User)
    private userRespository: Repository<User>
  ) {}
  
  async create(createUserDto: Partial<User>): Promise<User> {
    
    const user = this.userRespository.create(createUserDto);

    await this.userRespository.save(user);

    return user;
  }

  async findBy(query: Partial<User>): Promise<User[]> {
    return this.userRespository.find({ where: query })
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRespository.findOneBy({ id })
  }
}
