import { Place } from "../entities/place.entity";

export class GetScheduleDetailDto {
    scheduleId: number;
    name: string;
    startDate: string;
    endDate: string;
    places: Place[];
}