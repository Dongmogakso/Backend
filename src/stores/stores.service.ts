import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { User } from 'src/auth/entity/user.entity';
import { CreateStoreReviewDto } from './dto/create-store-review.dto';
import { UpdateStoreReviewDto } from './dto/update-store-review.dto';
import { Store } from './entities/store.entity';
import { Comment } from './entities/comment.entity';
import { CreateReviewCommentDto } from './dto/create-review-comment.dto';
import { UpdateReviewCommentDto } from './dto/update-review-comment.dto';

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
        @InjectRepository(User) // User 엔터티의 레포지토리 주입
        private readonly userRepository: Repository<User>,
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) { }

    async createReview(reviewDto: CreateStoreReviewDto): Promise<string | null> {
        const review = new Review();
        review.title = reviewDto.title;
        review.content = reviewDto.content;
        review.rating = reviewDto.rating;

        const user = await this.userRepository.findOne({ where: { userId: reviewDto.userId } });
        if (!user) {
            throw new Error('2')
        }
        review.user = user; // User 엔터티의 인스턴스 설정

        const store = await this.storeRepository.findOne({ where: { storeId: reviewDto.storeId } });
        if (!store) {
            const newStore = new Store();
            newStore.storeId = reviewDto.storeId;
            newStore.storeName = reviewDto.storeName;
            newStore.storeUrl = reviewDto.storeUrl;
            newStore.categoryName = reviewDto.categoryName;
            newStore.addressName = reviewDto.addressName;
            newStore.roadAddressName = reviewDto.roadAddressName;
            newStore.phone = reviewDto.phone;
            await this.storeRepository.save(newStore);
            review.store = newStore
        }
        else {
            review.store = store;
        }

        await this.reviewRepository.save(review);
        return null;
    }

    async findAllReview(storeId: string): Promise<Review[]> {
        const store = await this.storeRepository.findOne({ where: { storeId: storeId } });
        if (!store) {
            throw new Error('1')
        }
        return await this.reviewRepository.find({ where: { store: { storeId: storeId } } });
    }

    async findOneReview(reviewId: number): Promise<Review> {
        const review = await this.reviewRepository.findOne({ where: { reviewId: reviewId } })
        if (!review) {
            throw new Error('1')
        }
        return review
    }

    async updateReview(reviewId: number, review: UpdateStoreReviewDto) {
        const prevReview = await this.reviewRepository.findOne({ where: { reviewId: reviewId } });
        if (!prevReview) {
            throw new Error('1')
        }

        if (review.title === null) { review.title = prevReview.title; }
        if (review.content === null) { review.content = prevReview.content; }
        if (review.rating === null) { review.rating = prevReview.rating; }

        let reviewToUpdate = { ...prevReview, ...review };

        await this.reviewRepository.save(reviewToUpdate)
    }

    async removeReview(reviewId: number): Promise<void> {
        const review = await this.reviewRepository.findOne({ where: { reviewId: reviewId } })
        if (!review) {
            throw new Error('1')
        }
        const comments = await this.commentRepository.find({ where: { review: { reviewId: reviewId } } })
        for (const comment of comments) {
            this.removeComment(comment.commentId)
        }

        await this.reviewRepository.delete(reviewId)
    }

    async createComment(reviewId: number, commentDto: CreateReviewCommentDto): Promise<Comment> {
        const comment = new Comment();
        comment.content = commentDto.content;

        const review = await this.reviewRepository.findOne({ where: { reviewId: reviewId } });
        if (!review) {
            throw new Error('1')
        }
        comment.review = review; // Review 엔터티의 인스턴스 설정

        const user = await this.userRepository.findOne({ where: { userId: commentDto.userId } });
        if (!user) {
            throw new Error('2')
        }
        comment.user = user;

        return await this.commentRepository.save(comment);
    }

    async updateComment(commentId: number, comment: UpdateReviewCommentDto) {
        const prevComment = await this.commentRepository.findOne({ where: { commentId: commentId }, relations: ['user'] });
        if (!prevComment) {
            throw new Error('1')
        }
        let commentToUpdate = { ...prevComment, ...comment };
        await this.commentRepository.save(commentToUpdate);
    }

    async removeComment(commentId: number): Promise<void> {
        const comment = await this.commentRepository.find({ where: { commentId: commentId } })
        if (!comment) {
            throw new Error('1')
        }
        await this.commentRepository.delete(commentId)
    }
}
