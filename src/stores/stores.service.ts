import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { User } from 'src/auth/entity/user.entity';
import { CreateStoreReviewDto } from './dto/create-store-review.dto';
import { UpdateStoreReviewDto } from './dto/update-store-review.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
        @InjectRepository(User) // User 엔터티의 레포지토리 주입
        private readonly userRepository: Repository<User>,
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,
    ) {}

    async create(reviewDto: CreateStoreReviewDto): Promise<Review> {
        const review = new Review();
        review.title = reviewDto.title;
        review.content = reviewDto.content;
        review.rating = reviewDto.rating;

        const user = await this.userRepository.findOne({ where: { userId: reviewDto.userId }});
        review.user = user; // User 엔터티의 인스턴스 설정

        const store = await this.storeRepository.findOne({ where: { storeId: reviewDto.storeId }});
        review.store = store;

    return await this.reviewRepository.save(review);
    }

    async findAll(storeId: number): Promise<Review[]> {
        return await this.reviewRepository.find({ where: { store: { storeId: storeId } } });
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
