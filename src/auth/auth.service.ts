import { Injectable } from '@nestjs/common';
import { loginrqDto } from './dto/login_rq.dto';
import { AuthUtils } from './auth.utils';

@Injectable()
export class AuthService {
  constructor(private readonly authUtils: AuthUtils) {}
  async login(authDto: loginrqDto) {
    return this.authUtils.validateUser(authDto);
  }
}
