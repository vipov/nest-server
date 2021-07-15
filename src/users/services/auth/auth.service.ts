import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  
  constructor(private usersService: UsersService) {}

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
    return crypto.createHmac('sha256', 'mySecretShouldBeMovedToConfig').update(password).digest('hex');
  }

}