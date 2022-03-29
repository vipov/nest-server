import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { IsString, MinLength, IsEmail } from "class-validator";
import { Transform } from "class-transformer";

export class AuthLoginDto {

  @ApiProperty({example: 'piotr@myflow.pl'})
  @IsEmail()
  email: string;

  @ApiProperty({example: '123'})
  @IsString()
  @MinLength(3, {
    message: 'Hasło wymaga min 3 znaków',
  })
  password: string;

  @ApiProperty({example: '2022-03-20'})
  @Transform(({value}) => new Date(value), {toClassOnly: true})
  @Transform(({value}) => value.toISOString(), {toPlainOnly: true})
  date?: Date
}

export class AuthLoginResponse {
  token: string;
  user: User;
}

export class AuthRegisterDto {
  @ApiProperty({example: 'Justyna'})
  @IsString()
  @MinLength(3)
  name: string;
  @ApiProperty({example: 'justyna@myflow.pl'})
  @IsEmail()
  email: string;
  @ApiProperty({example: '!@#'})
  @IsString()
  @MinLength(3, {
    message: 'Hasło wymaga min 3 znaków',
  })
  password: string;
}

export class AuthRegisterResponse {
  user: User;
}
