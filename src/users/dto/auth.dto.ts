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
