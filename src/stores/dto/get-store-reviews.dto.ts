export class GetStoreReviewsDto {
    reviewId: number;
    name: string;
    email: string;
    title?: string;
    content?: string;
    rating: number;
    createdAt: Date;
    updatedAt?: Date;
    
}