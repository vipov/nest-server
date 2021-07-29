import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { User, Role, Roles } from '../entities';

@Injectable()
export class UsersService {

  async create(createUserDto: CreateUserDto): Promise<User> {

    //TODO pobrać to jako parametr wejściowy tej metody
    let role = await Role.findOne({name: Roles.ADMIN})

    if(!role) {
      throw new BadRequestException("role not found")
    }

    const user = User.create(createUserDto);

    user.roles = [role];

    await User.save(user);

    return user;
  }

  async findBy(query: Partial<User>): Promise<User[]> {
    return User.find(query);
  }

  async findAll(searchString?: string): Promise<User[]> {
    //TODO użyć buildera by wyszukać po stringu
    return User.find();
  }

  async findOne(id: number): Promise<User | null> {
    return User.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

    return User.update({id}, updateUserDto).then(res => res.raw);

    // const updated = await User.createQueryBuilder()
    // .update(updateUserDto)
    // .where({id})
    // .execute()

    // return updated.raw;
  }

  async remove(id: number): Promise<boolean> {

    const user = await User.findOne(id);

    if(!user) {
      throw new NotFoundException("user not found");
    }

    await user.remove();

    return true;
  }
}
