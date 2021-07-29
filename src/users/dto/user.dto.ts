import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities";

export class CreateUserDto {
  @ApiProperty({example: 'Władek', description: 'Name of the user'})
  name: string;

  @ApiProperty({example: 'wladek@myflow.pl', description: 'your email address'})
  email: string;

  @ApiProperty({example: '123', description: 'password min 3 chars'})
  password: string;

  @ApiProperty({example: 1})
  partner: number;
}

export class CreateUserResponse {

  user: User;

  constructor(data: CreateUserResponse) {
    Object.assign(this, data)
  }
}

export class UpdateUserDto {
  name: string;
  email: string;
}

export class UpdateUserResponse {
  user: User
}
