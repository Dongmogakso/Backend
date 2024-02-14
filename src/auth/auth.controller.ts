import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginrqDto } from './dto/login_rq.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: loginrqDto) {
    return this.authService.login(authDto);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto){
    return this.authService.signup(signupDto);
  }
}
