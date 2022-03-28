import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({example: 'Justyna'})
  name: string;

  @ApiProperty({example: 'justyna@myflow.pl'})
  email: string;

  @ApiProperty({example: '!@#'})
  password: string;
}

export class CreateUserResponse {
  user: User;
  // comments: UserComments
}

export class UpdateUserDto {
  name?: string;
  email?: string;
}

export class UpdateUserResponse {
  user: User;
}

export class FindUsersDto {
  @ApiProperty({description: 'szukane słowo w entcji'})
  q?: string;
  sortBy?: string;
  sortDir?: string;
  page?: number;
}

export class UserErrorResponse {
  statusCode: number;
  message: string;
  error: string
}