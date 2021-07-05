import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import { UserRegisterResponseDto, UserRegisterRequestDto } from '../dto';
import { UserEntity, UserRole } from '../entities';
import { AuthGuard } from '../guards/auth.guard';
import { UserInterceptor } from '../interceptors/user.interceptor';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @ApiCreatedResponse({ type: UserRegisterResponseDto })
  async register(
    @Body() data: UserRegisterRequestDto,
  ): Promise<UserRegisterResponseDto> {
    const user = await this.userService.create(data);
    // TODO handle errors
    return {
      user,
    };
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  getUser(@User() user: UserEntity) {
    console.log('CONTROLLER: UserController.getUser()')
    return {user};
  }

}
