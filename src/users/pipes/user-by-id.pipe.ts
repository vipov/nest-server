import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Injectable()
export class UserByIdPipe implements PipeTransform {

  constructor(
    private userService: UsersService,
  ) {}

  async transform(value: string, metadata: ArgumentMetadata): Promise<User> {

    const id = parseInt(value, 10);

    if(!id) {
      throw new BadRequestException('userId param should be numeric string');
    }

    const user = await this.userService.findOne(id);

    if(!user) {
      throw new NotFoundException(`User by id ${id} not found`)
    }

    return user;
  }
}
