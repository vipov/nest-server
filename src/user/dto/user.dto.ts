import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, MinLength, IsEmail } from 'class-validator';
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
}

export class UserLoginResponseDto {
  token: string;

  @Type(() => UserEntity)
  user: UserEntity;
}

export class UserGetByIdDto {
  constructor(public user: UserEntity) {}
}
