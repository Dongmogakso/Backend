import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entity/user.entity';
import { GetSchedulesDto } from './dto/get-schedules.dto';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place } from './entities/place.entity';
import { Store } from 'src/stores/entities/store.entity';
import { GetScheduleDetailDto } from './dto/get-schedule-detail.dto';
import { get } from 'http';
import { share } from 'rxjs';

@Injectable()
export class SchedulesService {
    constructor(
        @InjectRepository(Schedule)
        private readonly scheduleRepository: Repository<Schedule>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Place)
        private readonly placeRepository: Repository<Place>,
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,
    ) { }

    async createSchedule(scheduleDto: CreateScheduleDto) {

        if (!scheduleDto.name || scheduleDto.startDate || scheduleDto.endDate) throw new Error("1")

        const schedule = new Schedule();
        schedule.name = scheduleDto.name;
        schedule.startDate = scheduleDto.startDate;
        schedule.endDate = scheduleDto.endDate;


        const user = await this.userRepository.findOne({ where: { userId: scheduleDto.userId } })
        if (!user) throw new Error("2")
        schedule.user = user;

        return await this.scheduleRepository.save(schedule);
    }

    async findAllSchedules(getSchedulesDto: GetSchedulesDto) {
        return await this.scheduleRepository.find({ where: { user: { userId: getSchedulesDto.userId } } })
    }

    async findOneSchedule(scheduleId: number) {
        const schedule = await this.scheduleRepository.findOne({ where: { scheduleId: scheduleId } })
        if (!schedule) throw new Error("1")

        const getSchedule = new GetScheduleDetailDto();

        getSchedule.name = schedule.name;
        getSchedule.scheduleId = schedule.scheduleId;
        getSchedule.startDate = schedule.startDate;
        getSchedule.endDate = schedule.endDate;

        getSchedule.places = await this.placeRepository.find({ where: { schedule: { scheduleId: schedule.scheduleId } } })

        return getSchedule;
    }

    async createPlace(scheduleId: number, createPlaceDto: CreatePlaceDto) {
        if (!createPlaceDto.date || !createPlaceDto.time) throw new Error("1")

        const place = new Place();
        place.date = createPlaceDto.date;
        place.time = createPlaceDto.time;

        const schedule = await this.scheduleRepository.findOne({ where: { scheduleId: scheduleId } });
        if (!schedule) throw new Error("2")
        place.schedule = schedule;

        const store = await this.storeRepository.findOne({ where: { storeId: createPlaceDto.storeId } });
        if (!store) throw new Error("3")
        place.store = store;

        return await this.placeRepository.save(place)
    }

    async removeSchedule(scheduleId: number) {
        const schedule = await this.scheduleRepository.findOne({ where: { scheduleId: scheduleId } });
        if (!schedule) {
            throw new Error('1')
        }

        const places = await this.placeRepository.find({ where: { schedule: { scheduleId: scheduleId } } })

        await Promise.all(places.map(place => this.removePlace(place.placeId)));

        return await this.scheduleRepository.delete(scheduleId)
    }

    async removePlace(placeId: number) {

        const place = await this.placeRepository.findOne({ where: { placeId: placeId } })
        if (!place) {
            throw new Error('1')
        }
        return await this.placeRepository.delete(placeId)

    }

}
