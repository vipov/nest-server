import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { from } from 'rxjs';
import { delay } from 'rxjs/operators';

@Controller('users')
export class UsersController {

  constructor(
    private userService: UsersService,
  ) { }

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id) {
    return from(this.userService.findById(id)).pipe(
      delay(2000),
    );
  }
}
