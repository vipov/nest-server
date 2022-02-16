import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { Role, RoleNames, User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private roles: Role[] = [];
  private users: User[] = [];

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findBy(query: Partial<User>): Promise<User[]> {
    return this.userModel.find().where(query).exec();
  }

  async findAll(searchString?: string): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }).exec();

    return user;
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    return user.remove();
  }
}
