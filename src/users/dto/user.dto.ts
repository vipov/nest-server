import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'Justyna', description: 'User name' })
  name: string;

  @ApiProperty({ example: 'justyna@myflow.pl', description: 'User email' })
  email: string;

  @ApiProperty({
    example: '!@#',
    description: 'Password has to be min 3 chars',
  })
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

export class UsersErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}
