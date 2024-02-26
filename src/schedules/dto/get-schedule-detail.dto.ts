import { ApiProperty } from '@nestjs/swagger';

class Place {
    @ApiProperty({
        example: 1,
        required: true
    })
    placeId: number;

    @ApiProperty({
        example: '2024-02-29',
        required: true
    })
    date: string;

    @ApiProperty({
        example: '11:00',
        required: true
    })
    time: string;
}

export class GetScheduleDetailDto {
    @ApiProperty({
        example: 1,
        required: true
    })
    scheduleId: number;
    
    @ApiProperty({
        example: 'schedule1',
        required: true
    })
    name: string;
    
    @ApiProperty({
        example: '2024-02-29',
        required: true
    })
    startDate: string;
   
    @ApiProperty({
        example: '2024-03-02',
        required: true
    })
    endDate: string;
    
    @ApiProperty({
        example: [
            { placeId: 1, date: '2024-02-29', time: '11:00' },
            { placeId: 2, date: '2024-03-01', time: '12:00' },
        ],
        required: false
    })
    places: Place[];
}