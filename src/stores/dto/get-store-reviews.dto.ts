import { ApiProperty } from '@nestjs/swagger';

export class GetStoreReviewsDto {

    @ApiProperty({
        example: 1,
        description: 'reviewId',
        required: true
    })
    reviewId: number;

    @ApiProperty({
        example: 'Hello',
        description: 'title',
        required: true
    })
    title: string;

    @ApiProperty({
        example: 'Good',
        required: true
    })
    content: string;

    @ApiProperty({
        example: 3,
        required: true
    })
    rating: number;

    @ApiProperty({
        example: '2024-02-19T18:37:57.000Z',
        description: '리뷰 생성 일자',
        required: true
    })
    createdAt: Date;

    @ApiProperty({
        example: '2024-02-19T18:37:57.000Z',
        description: '리뷰 수정 일자',
        required: false
    })
    updatedAt?: Date;

    // user table 생성 후 유저 email 추가
    
}