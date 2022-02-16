import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class AuthLoginDto {
  @ApiProperty({ example: 'piotr@myflow.pl' })
  email: string;

  @ApiProperty({ example: '123' })
  password: string;
}

export class AuthLoginResponse {
  token: string;
  user: User;
}

export class AuthRegisterDto {
  name: string;
  email: string;
  password: string;
}

export class AuthRegisterResponse {
  user: User;
}
