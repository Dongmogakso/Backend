import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaceDto {
    @ApiProperty({
        example: '2024-02-29',
        required: true
    })
    date: string;
    
    @ApiProperty({
        example: '16:00',
        required: true
    })
    time: string;

    @ApiProperty({
        example: '16618597',
        required: true
    })
    storeId: string;

    @ApiProperty({
        example: '장생당약국',
        required: false
    })
    storeName: string;

    @ApiProperty({
        example: 'http://place.map.kakao.com/16618597',
        required: false
    })
    storeUrl: string;

    @ApiProperty({
        example: '의료,건강 > 약국',
        required: false
    })
    categoryName: string;

    @ApiProperty({
        example: '서울 강남구 대치동 943-16',
        required: false
    })
    addressName: string;

    @ApiProperty({
        example: '서울 강남구 테헤란로84길 17',
        required: false
    })
    roadAddressName: string;

    @ApiProperty({
        example: '02-558-5476',
        required: false
    })
    phone: string;
}