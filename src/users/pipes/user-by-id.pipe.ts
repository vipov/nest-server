import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UsersService } from '../services';

@Injectable()
export class UserByIdPipe implements PipeTransform {

  constructor(
    private usersService: UsersService,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    
    const id = parseInt(value, 10);
    
    if(!id) {
      throw new BadRequestException('Id param validation failed');
    }

    const user = await this.usersService.findOne(id);

    if(!user) {
      throw new NotFoundException(`user for id ${id} not found`)
    }

    return user;
  }
}
