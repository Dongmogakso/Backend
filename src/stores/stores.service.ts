import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateStoreReviewDto } from './dto/create-store-review.dto';
import { UpdateStoreReviewDto } from './dto/update-store-review.dto';

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
    ) {}

    async create(review:CreateStoreReviewDto) {
        await this.reviewRepository.save(review)
    }

    findAll(storeId: number): Promise<Review[]> {
        return this.reviewRepository.find({ where: { storeId: storeId }});
    }

    findOne(reviewId: number): Promise<Review> {
        return this.reviewRepository.findOne({ where: {reviewId: reviewId} })
    }

    async update(reviewId: number, review:UpdateStoreReviewDto) {
        const prevReview = await this.reviewRepository.findOne({ where: {reviewId:reviewId}});
        if (review.title === null) {review.title = prevReview.title; }
        if (review.content === null) {review.content = prevReview.content; }
        if (review.rating === null) {review.rating = prevReview.rating; }

        let reviewToUpdate = {...prevReview, ...review};
        await this.reviewRepository.save(reviewToUpdate)
    }

    async remove(reviewId: number): Promise<void> {
        await this.reviewRepository.delete(reviewId)
    }
}
