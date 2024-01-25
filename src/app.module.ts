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

@Module({
  imports: [AuthModule, StoresModule, SchedulesModule, TypeOrmModule.forFeature([Review]),
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
    entities  :[Store, Review],
    synchronize : true
  }),
],
  controllers: [AppController, AuthController, StoresController, SchedulesController],
  providers: [AppService, StoresService],
})
export class AppModule {}
