import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStoreReviewDto {
    @IsOptional()
    @IsString()
    title: string;
    @IsOptional()
    @IsString()
    content: string;
    @IsOptional()
    @IsNumber()
    rating: number;

    // photo
}