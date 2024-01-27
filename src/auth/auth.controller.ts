import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('login')
    async login(
      @Body('email') email: string,
      @Body('password') password: string,
    ) {
      const user = await this.authService.validateUser(email, password);
  
      if (!user.isValid) {
        throw new HttpException({ error_code: 1 }, HttpStatus.UNAUTHORIZED);
      }
  
      // 실제 토큰 생성 및 반환 로직은 여기에 추가
      const token = this.authService.generateToken(user.email);
  
      return { token, email: user.email, error_code: 0 };
    }
  }
  