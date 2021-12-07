import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class CreateUserDto {
  @ApiProperty({example: 'Justyna', description: 'Nazwa dla użytkownika'})
  name: string;

  @ApiProperty({example: 'justyna@myflow.pl'})
  email: string;

  @ApiProperty({example: '!@#', description: 'Hasło, min 3 znaki'})
  password: string;
}

export class CreateUserResponse {
  user: User
}

export class UpdateUserDto {
  name: string;
  email: string;
}

export class UpdateUserResponse {
  user: User
}

export class RemoveUserResponse {
  status: 'error' | 'success';
  removedId: number;
}