import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEmail, IsString, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class AuthLoginDto {
  @ApiProperty({ example: 'piotr@myflow.pl' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123' })
  @IsString()
  @MinLength(3)
  password: string;

  remember?: string;

  getName() {
    return this.email.split('@')[0];
  }
}

export class AuthLoginResponse {
  token: string;
  user: User;
}

export class AuthRegisterDto {
  @ApiProperty({ example: 'Justyna' })
  name: string;

  @ApiProperty({ example: 'justyna@myflow.pl' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123' })
  @IsString()
  @MinLength(3)
  password: string;

  @Type(() => Date)
  @IsDate()
  @Transform((el) => el.value, { toClassOnly: true })
  birthday: Date;
}

export class AuthRegisterResponse {
  user: User;
}
