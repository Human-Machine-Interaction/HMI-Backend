
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/publicAPI.decorator';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  logIn(@Body() loginDto: LoginDto) {
    return this.authService.logIn(loginDto);
  }

  @Post('signup')
  @Public()
  signUp(@Body() signUpDto: LoginDto) {
    return this.authService.signUp(signUpDto);
  }
}
