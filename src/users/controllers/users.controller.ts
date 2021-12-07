import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  @Get()
  getUsers() {
    return [
      { id: 1, name: 'Piotr' },
      {
        id: 2,
        name: 'Paweł',
        type: 'Paweł',
      },
    ];
  }

  @Post()
  addUser() {
    return {id: 22, name: 'new user'}
  }
}
