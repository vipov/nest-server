import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { AuthLoginResponse } from '../dto';
import { RequestPayload, TokenPayload, User } from '../entities';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {

    const passwordHash = await this.encodePassword(password);

    const [user] = await this.usersService.findBy({email});

    if (user && user.password === passwordHash) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async encodePassword(password: string) {
    return password;
    // return crypto.createHmac('sha256', 'mySecretShouldBeMovedToConfig').update(password).digest('hex');
  }

  async findByCredentials(email: string, password: string): Promise<User | null> {

    const [user] = await this.usersService.findBy({email});

    const passwordHash = await this.encodePassword(password);

    if (user && user.password === passwordHash) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async encodeUserToken(user: User): Promise<string> {

    const payload: TokenPayload = { username: user.email, sub: user.id };

    return this.jwtService.sign(payload);
  }
  

  async decodeUserToken(token: string): Promise<RequestPayload | null> {

    const payload: TokenPayload = this.jwtService.verify(token);

    const [user] = await this.usersService.findBy({id: payload.sub});

    return user ? { user } : null;
  }

}
