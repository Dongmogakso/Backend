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
import { User } from './auth/entities/user.entity';

@Module({
  imports: [AuthModule, StoresModule, SchedulesModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'host.docker.internal',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'user',
    entities: [User],
    synchronize: true,
  }),],
  controllers: [AppController, AuthController, StoresController, SchedulesController],
  providers: [AppService],
})
export class AppModule {}
