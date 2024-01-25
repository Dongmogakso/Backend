import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { StoresController } from './stores.controller';

@Module({
  imports : [TypeOrmModule.forFeature([Review])],
  controllers: [StoresController],
  providers: [StoresService]
})
export class StoresModule {}
