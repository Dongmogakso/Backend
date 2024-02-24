import { IsNotEmpty } from 'class-validator';

export class CreateStoreReviewDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    content: string;
    @IsNotEmpty()
    rating: number;
    @IsNotEmpty()
    userId: number;
    storeId: number;

    // photo
} 