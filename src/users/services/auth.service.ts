import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestPayload, TokenPayload, User } from '../entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const [user] = await this.usersService.findBy({ email });

    if (!user) {
      return null;
    }

    if (!this.validatePassword(password, user.password)) {
      return null;
    }

    return user;
  }

  encodePassword(password: string): string {
    return password; //TODO hash password
  }

  validatePassword(password: string, hash: string): boolean {
    return password === hash; //TODO validate hash
  }

  async encodeUserToken(user: User): Promise<string> {
    const payload: TokenPayload = { username: user.email, sub: user.id };

    return this.jwtService.sign(payload);
  }

  async decodeUserToken(token: string): Promise<RequestPayload> {
    const payload: TokenPayload = this.jwtService.verify(token);
    const user = await this.usersService.findOne(payload.sub);

    return user ? { user, token } : null;
  }
}
