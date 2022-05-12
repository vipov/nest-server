import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { User } from '../../entities/user.entity';

export class AuthRegisterDto {
  @IsString()
  @ApiProperty({ example: 'Przemek' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'pp@pp.pl' })
  email: string;

  @MinLength(3)
  @ApiProperty({ example: '!4%' })
  password: string;
}

export class AuthRegisterResponse {
  user: User;
}

export class AuthLoginDto {
  @IsEmail()
  @ApiProperty({ example: 'pp@pp.pl' })
  email: string;

  @MinLength(3)
  @ApiProperty({ example: '!4%' })
  password: string;
}

export class AuthLoginResponse {
  token: string;
  user: User;
}
