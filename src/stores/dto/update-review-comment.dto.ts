import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewCommentDto {
    @ApiProperty({
        example: 'Good',
        required: true
    })
    content: string;
}