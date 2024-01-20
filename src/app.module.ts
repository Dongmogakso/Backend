import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { StoresController } from './stores/stores.controller';
import { StoresModule } from './stores/stores.module';
import { SchedulesController } from './schedules/schedules.controller';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [AuthModule, StoresModule, SchedulesModule],
  controllers: [AppController, AuthController, StoresController, SchedulesController],
  providers: [AppService],
})
export class AppModule {}
