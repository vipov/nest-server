import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor(private usersService: UsersService) {}

  async transform(userId: string, metadata: ArgumentMetadata): Promise<User> {
    console.log('PIPE METADATA', metadata);
    const id = parseInt(userId, 10);

    if (!id) {
      throw new BadRequestException(`Id param ${userId} has to be valid number`);
    }

    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User for id ${id} not found`);
    }

    return user;
  }
}
