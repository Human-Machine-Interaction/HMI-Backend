
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { checkPassword } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async logIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!checkPassword(pass, user.password)) {
      console.log('Password match');
      throw new UnauthorizedException();
    }
    const payload = { sub:user.username, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}