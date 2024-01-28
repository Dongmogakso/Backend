import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async generateToken(email: string): Promise<string> {
    // token secret key 넣어줘야함
    const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '1h' });
    return token;
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async validateUser(authDto: AuthDto): Promise<{ isValid: boolean; email?: string; name?: String }> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: authDto.email },
      });
      if (user && (await bcrypt.compare(authDto.password, user.password))) {
        return { isValid: true, email: user.email, name: user.name };
      } else {
        return { isValid: false };
      }
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
