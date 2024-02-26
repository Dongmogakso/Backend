import { Controller, Post, Get, Patch, Body, Delete, Param, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { SchedulesService } from './schedules.service';
import { GetSchedulesDto } from './dto/get-schedules.dto';
import { CreatePlaceDto } from './dto/create-place.dto';import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Schedules')
@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}

    @ApiOperation({ summary: '여행 스케쥴 조회'})
    @Get('/')
    async getAllSchedules(@Body() getSchedulesDto: GetSchedulesDto) {
        try {
            const schedules = await this.schedulesService.findAllSchedules(getSchedulesDto);
            return schedules
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

    @ApiOperation({ summary: '여행 스케쥴 세부 조회'})
    @Get('/:scheduleId')
    async getOneSchedule(@Param('scheduleId', ParseIntPipe) scheduleId: number) {
        try {
            const schedule = await this.schedulesService.findOneSchedule(scheduleId)
            return schedule
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

    @ApiOperation({ summary: '여행 스케쥴 추가'})
    @Post('/')
    async createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
        try {
            await this.schedulesService.createSchedule(createScheduleDto)
            return { errorCode : 0 }
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

    @ApiOperation({ summary: '여행 스케쥴에 가게 추가'})
    @Post('/place/:scheduleId')
    async createPlace (@Param('scheduleId', ParseIntPipe) scheduleId: number, @Body() createPlaceDto: CreatePlaceDto) {
        try {
            await this.schedulesService.createPlace(scheduleId, createPlaceDto);
            return { errorCode : 0 }
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

    @ApiOperation({ summary: '여행 스케쥴 삭제'})
    @Delete('/:scheduleId')
    async deleteSchedule (@Param('scheduleId', ParseIntPipe) scheduleId: number) {
        try {
            await this.schedulesService.removeSchedule(scheduleId)
            return { errorCode : 0 }
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

    @ApiOperation({ summary: '여행 스케쥴에 가게 삭제'})
    @Delete('/place/:placeId')
    async deletePlace (@Param('placeId', ParseIntPipe) placeId: number) {
        try {
            await this.schedulesService.removePlace(placeId)
            return { errorCode : 0 }
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

}
