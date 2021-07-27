import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";
import { User } from "../entities";

export class AuthLoginDto {

  @ApiProperty({example: 'piotr@myflow.pl'})
  @IsEmail()
  email: string;

  @ApiProperty({example: '123'})
  @IsString()
  @MinLength(3)
  password: string;
  
  @ApiProperty({example: 0})
  @Transform(v => !!v.value, {toClassOnly: true})
  @Transform(v => v.value ? 1 : 0, {toPlainOnly: true})
  marketing: number;
  
  @Transform(v => new Date(v.value), {toClassOnly: true})
  @Transform((v) => (v.value as Date).toISOString(), {toPlainOnly: true})
  createdAt: Date
}

export class AuthLoginResponse {
  token: string;
  user: User;
}

export class AuthRegisterDto {

  @ApiProperty({example: 'Adam'})
  name: string;

  @ApiProperty({example: 'adam@myflow.pl'})
  email: string;

  @ApiProperty({example: '123'})
  password: string;
}

export class AuthRegisterResponse {
  user: User;
}
