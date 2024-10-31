
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { checkPassword } from 'src/utils';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async logIn(loginDto:LoginDto): Promise<any> {
    const user = await this.usersService.findOne(loginDto.username);
    if (!checkPassword(loginDto.password, user.password)) {
      console.log('Password match');
      throw new UnauthorizedException();
    }
    const payload = { sub:user.username, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto:SignUpDto): Promise<any> {
    const user = await this.usersService.create(signUpDto);
     const payload = { sub:user.username, username: user.username };
     return {
       access_token: await this.jwtService.signAsync(payload),
     };
  }
}