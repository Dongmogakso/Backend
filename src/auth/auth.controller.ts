import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginrqDto } from './dto/login_rq.dto';
import { SignupDto } from './dto/signup.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'
import { loginrssdto } from './dto/login_rs_s.dto';
import { SignupRsDto } from './dto/signup_rs.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiResponse({
    type: loginrssdto,
    description: 'success',
    status: 201,
  })
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async login(@Body() authDto: loginrqDto) {
    return this.authService.login(authDto);
  }

  @ApiResponse({
    type: SignupRsDto,
    description: 'success',
    status: 201,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
