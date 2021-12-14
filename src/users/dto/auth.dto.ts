import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';
import { Transform } from 'class-transformer';

export class AuthLoginDto {
  @ApiProperty({ example: 'piotr@myflow.pl' })
  @IsEmail({}, { message: 'Invalid Email ;)' })
  email: string;

  @ApiProperty({ example: '!@#' })
  @IsString()
  @MinLength(3)
  password: string;
}

export class AuthLoginResponse {
  token: string;
  user: User;
}

export class AuthRegisterDto {
  @ApiProperty({ example: 'Justyna' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'justyna@myflow.pl' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '!@#', description: 'Minimum 3 chars' })
  @MinLength(3)
  password: string;

  @ApiProperty({ example: '23' })
  @Transform((o) => parseInt(o.value, 10), { toClassOnly: true })
  age: string;
}

export class AuthRegisterResponse {
  user: User;
}
