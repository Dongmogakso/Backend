import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreReviewDto {
    @ApiProperty({
        example: 'Hello',
        description: 'title',
        required: true
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: 'Good',
        required: true
    })
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        example: 3,
        required: true
    })
    @IsNotEmpty()
    rating: number;

    @ApiProperty({
        example: 1,
        required: true
    })
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        example: '26338954',
        required: true
    })
    storeId: string;

    @ApiProperty({
        example: '카카오프렌즈 코엑스점',
        required: false
    })
    storeName: string;

    @ApiProperty({
        example: 'http://place.map.kakao.com/26338954',
        required: false
    })
    storeUrl: string;

    @ApiProperty({
        example: '가정,생활 > 문구,사무용품 > 디자인문구 > 카카오프렌즈',
        required: false
    })
    categoryName: string;

    @ApiProperty({
        example: '서울 강남구 삼성동 159',
        required: false
    })
    addressName: string;

    @ApiProperty({
        example: '서울 강남구 영동대로 513',
        required: false
    })
    roadAddressName: string;

    @ApiProperty({
        example: '02-6002-1880',
        required: false
    })
    phone: string;

    // photo
} 