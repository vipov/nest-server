import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../services';

@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    console.log('PIPE: UseById', value);
    const id = parseInt(value, 10);

    if (!id) {
      throw new BadRequestException('Id param validation failed');
    }

    const user = await this.userService.getById(id);

    if (!user) {
      throw new NotFoundException(`User for id ${id} not found`);
    }
    return user;
  }
}
