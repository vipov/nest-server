import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class AuthLoginDto {
  @ApiProperty({example: 'justyna@myflow.pl'})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({example: '!@#'})
  @MinLength(3)
  @IsString()
  password: string;

  @Transform((v) => new Date(v.value))
  createdAt?: Date;

  getName() {
    return this.email.split('@')[0];
  }
}

export class AuthLoginResponse {
  token: string;
  user: User;
}

export class AuthRegisterDto {
  @ApiProperty({example: 'Justyna'})
  @IsNotEmpty()
  name: string;

  @ApiProperty({example: 'justyna@myflow.pl'})
  @IsEmail()
  email: string;
  
  @ApiProperty({example: '!@#'})
  @MinLength(3)
  password: string;
}

export class AuthRegisterResponse {
  user: User;
}
