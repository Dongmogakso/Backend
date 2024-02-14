import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { StoresController } from './stores.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Store } from './entities/store.entity';
import { User } from 'src/auth/entity/user.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Review, Store, User]),
  ],
  controllers: [StoresController],
  providers: [StoresService]
})
export class StoresModule {}
