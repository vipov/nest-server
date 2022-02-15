import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'Justyna' })
  name: string;

  @ApiProperty({ example: 'justyna@myflow.pl' })
  email: string;

  @ApiProperty({ example: '!@#', description: 'Min password length is 3chars' })
  password: string;
}

export class CreateUserResponse {
  user: User;
}

export class UpdateUserDto {
  name: string;
  email: string;
}

export class UpdateUserResponse {
  user: User;
}

export class FindUsersDto {
  @ApiProperty({ description: 'Szukane słowo' })
  q?: string;
}

export class UserErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}
