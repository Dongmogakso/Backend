export class GetStoreReviewsDto {
    reviewId: number;
    storeId: number;
    title: string;
    content: string;
    rating: number;
    createdAt: Date;
    updatedAt?: Date;

    // user table 생성 후 유저 email 추가
    
}