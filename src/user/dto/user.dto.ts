import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
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
  @IsEmail()
  email: string;

  @ApiProperty({example: '123'})
  @IsString()
  @MinLength(3)
  password: string;

  @Transform(({value}) => parseInt(value, 10))
  marketing: number;
}

export class UserLoginResponseDto {
  token: string;
  user: UserEntity;
}
