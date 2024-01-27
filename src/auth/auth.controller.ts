// auth.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const user = await this.authService.validateUser(authDto);

    if (!user.isValid) {
      throw new HttpException({ error_code: 1 }, HttpStatus.UNAUTHORIZED);
    }

    const token = this.authService.generateToken(user.email);

    return { token, email: user.email, error_code: 0 };
  }
}
