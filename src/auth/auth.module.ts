import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // User 엔터티를 포함시킵니다.
  ],
  providers: [AuthService]
})
export class AuthModule {}
