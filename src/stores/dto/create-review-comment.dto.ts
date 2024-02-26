import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewCommentDto {
    @ApiProperty({
        example: 'Good',
        required: true
    })
    content: string;
    
    @ApiProperty({
        example: 1,
        required: true
    })
    userId: number;
}