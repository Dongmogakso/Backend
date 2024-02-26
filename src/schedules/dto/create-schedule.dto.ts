import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
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
        example: 1,
        required: true
    })
    userId: number;
}