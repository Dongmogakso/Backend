import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  // 사용자 인증 로직을 구현할 부분
  async generateToken(email: string): Promise<string> {
    // 토큰 생성 로직을 추가
    const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '1h' });

    return token;
  }
  async validateUser(
    email: string,
    password: string,
  ): Promise<{ isValid: boolean; email?: string }> {
    // 여기에서 실제로 사용자를 검증하는 로직을 추가
    // 예를 들어, 데이터베이스에서 사용자 정보를 확인하고 맞으면 사용자 정보를 반환하고, 틀리면 null을 반환
    // 이 예제에서는 간단히 email이 'test@example.com'이고 password가 'password'인 경우에만 허용한다고 가정
    if (email === 'test@example.com' && password === 'password') {
      return { isValid: true, email: 'test@example.com' };
    }
    return { isValid: false };
  }
}