import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { StoresController } from './stores/stores.controller';
import { StoresModule } from './stores/stores.module';
import { SchedulesController } from './schedules/schedules.controller';
import { SchedulesModule } from './schedules/schedules.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Store } from './stores/entities/store.entity';
import { Review } from './stores/entities/review.entity';
import { StoresService } from './stores/stores.service';
import { Place } from './schedules/entities/place.entity';
import { Schedule } from './schedules/entities/schedule.entity';
import { Photo } from './stores/entities/photo.entity';
import { User } from './auth/entity/user.entity';
import { Comment } from './stores/entities/comment.entity';
import { SchedulesService } from './schedules/schedules.service';

@Module({
  imports: [AuthModule, StoresModule, SchedulesModule, TypeOrmModule.forFeature([Review, User, Store, Comment, Photo, Place, Schedule]),
  ConfigModule.forRoot({
    envFilePath:['.env'],
  }),
  TypeOrmModule.forRoot({
    type : "mariadb",
    host : process.env.DB_HOST,
    port : parseInt(process.env.DB_PORT),
    username : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
    entities  :[Store, Review, User, Comment, Photo, Place, Schedule],
    synchronize : true
  }),
],
  controllers: [AppController, AuthController, StoresController, SchedulesController],
  providers: [AppService, StoresService, SchedulesService],
})
export class AppModule {}
