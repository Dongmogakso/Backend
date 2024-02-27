import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { loginrqDto } from './dto/login_rq.dto';
import { loginrsfdto } from './dto/login_rs_f.dto';
import { loginrssdto } from './dto/login_rs_s.dto';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { SignupRsDto } from './dto/signup_rs.dto';
import { sign } from 'crypto';

@Injectable()
export class AuthUtils {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
    async generateToken(email: string): Promise<string> {
        const token = jwt.sign({ email }, 'your_secret_key', {expiresIn: '1h' });
        return token;
    }
    async validateUser(authDto: loginrqDto){
        try {
          const user = await this.userRepository.findOne({
            where: { email: authDto.email },
          });
          if (user && (await bcrypt.compare(authDto.password, user.password))) {
            const token = this.generateToken(user.email);
            const response_dto = new loginrssdto();
            response_dto.email = user.email;
            response_dto.name = user.name;
            response_dto.token = this.generateToken(user.email);
            response_dto.error_code = 0;
            return response_dto;
          } else {
            const response_dto = new loginrsfdto();
            response_dto.error_code = 1;
            return response_dto;
          }
        } catch (error) {
          throw new NotFoundException('User not found');
        }
      }
      async signup(signupDto: SignupDto){
        const response_dto = new SignupRsDto();
        if(await this.userRepository.findOne({where: {email: signupDto.email}})){
          response_dto.error_code = 1;
          return response_dto;
        }
        const { email, password, name } = signupDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
          email,
          password: hashedPassword,
          name,
        });
        await this.userRepository.save(newUser);
        response_dto.error_code = 0;
        return response_dto;
      }
}