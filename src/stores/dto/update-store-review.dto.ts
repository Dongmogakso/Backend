import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStoreReviewDto {
    @ApiProperty({
        example: 'Hello',
        required: false
    })
    @IsOptional()
    @IsString()
    title: string;
    
    @ApiProperty({
        example: 'Goood',
        required: false
    })
    @IsOptional()
    @IsString()
    content: string;
    
    @ApiProperty({
        example: 3,
        required: false
    })
    @IsOptional()
    @IsNumber()
    rating: number;

    // photo
}