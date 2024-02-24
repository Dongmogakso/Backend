import { Controller, Post, Get, Patch, Body, Delete, Param, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { SchedulesService } from './schedules.service';
import { GetSchedulesDto } from './dto/get-schedules.dto';
import { CreatePlaceDto } from './dto/create-place.dto';

@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}
    // 여행 스케쥴 조회
    @Get('/')
    getAllSchedules(@Body() getSchedulesDto: GetSchedulesDto) {
        return this.schedulesService.findAllSchedules(getSchedulesDto);
    }

    // 여행 스케쥴 세부 조회
    @Get('/:scheduleId')
    getOneSchedule(@Param('scheduleId', ParseIntPipe) scheduleId: number) {
        return this.schedulesService.findOneSchedule(scheduleId);
    }

    // 여행 스케쥴 추가
    @Post('/')
    createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
        return this.schedulesService.createSchedule(createScheduleDto);
    }

    // 여행 스케쥴에 가게 추가
    @Post('/place/:scheduleId')
    createPlace (@Param('scheduleId', ParseIntPipe) scheduleId: number, @Body() createPlaceDto: CreatePlaceDto) {
        return this.schedulesService.createPlace(scheduleId, createPlaceDto);
    }

    // 여행 스케쥴 삭제
    @Delete('/:scheduleId')
    deleteSchedule (@Param('scheduleId', ParseIntPipe) scheduleId: number) {
        return this.schedulesService.removeSchedule(scheduleId);
    }

    // 여행 스케쥴에 가게 삭제
    @Delete('/place/:placeId')
    deletePlace (@Param('placeId', ParseIntPipe) placeId: number) {
        return this.schedulesService.removePlace(placeId);
    }

}
