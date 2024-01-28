// auth.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: loginDto) {
    const user = await this.authService.validateUser(authDto);

    if (!user.isValid) {
      throw new HttpException({ error_code: 1 }, HttpStatus.UNAUTHORIZED);
    }

    const token = this.authService.generateToken(user.email);

    return { token, email: user.email, name: user.name, error_code: 0 };
  }
}
