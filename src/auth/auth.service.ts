import { Injectable } from '@nestjs/common';
import { loginrqDto } from './dto/login_rq.dto';
import { AuthUtils } from './auth.utils';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authUtils: AuthUtils) {}
  async login(authDto: loginrqDto) {
    return this.authUtils.validateUser(authDto);
  }
  async signup(signupDto: SignupDto){
    return this.authUtils.signup(signupDto);
  }
}
