import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities";
import { IsString, MinLength, IsEmail } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({example: 'piotr@myflow.pl'})
  @IsEmail()
  email: string;

  @ApiProperty({example: '123'})
  @IsString()
  @MinLength(3)
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