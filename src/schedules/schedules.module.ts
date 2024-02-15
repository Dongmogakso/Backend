import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/stores/entities/store.entity';
import { User } from 'src/auth/entity/user.entity';
import { Place } from './entities/place.entity';
import { Schedule } from './entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store, User, Place, Schedule]),
  ],
  providers: [SchedulesService]
})
export class SchedulesModule { }
