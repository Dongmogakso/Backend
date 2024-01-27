import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async generateToken(email: string): Promise<string> {
    const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '1h' });
    return token;
  }

  async validateUser(authDto: AuthDto): Promise<{ isValid: boolean; email?: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: authDto.email, password: authDto.password },
      });

      if (user) {
        return { isValid: true, email: user.email };
      } else {
        return { isValid: false };
      }
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
