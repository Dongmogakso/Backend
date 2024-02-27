import { ApiProperty } from '@nestjs/swagger';

export class GetSchedulesDto {
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
}