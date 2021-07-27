import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities";

export class AuthLoginDto {

  @ApiProperty({example: 'piotr@myflow.pl'})
  email: string;

  @ApiProperty({example: '123'})
  password: string;
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
