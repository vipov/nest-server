import { User } from '../entities/user.entity';

export class AuthLoginDto {
  email: string;
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
