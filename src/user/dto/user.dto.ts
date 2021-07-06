import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities';

export class UserRegisterRequestDto {
  @ApiProperty({example: 'Piotr'})
  name: string;

  @ApiProperty({example: 'piotr@myflow.pl'})
  email: string;
  @ApiProperty({example: '123'})
  password: string;
}

export class UserRegisterResponseDto {
  user: UserEntity;
}
export class UserLoginRequestDto {
  @ApiProperty({example: 'piotr@myflow.pl'})
  email: string;
  @ApiProperty({example: '123'})
  password: string;
}

export class UserLoginResponseDto {
  token: string;
  user: UserEntity;
}
