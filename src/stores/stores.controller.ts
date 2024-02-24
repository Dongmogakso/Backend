import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    ValidationPipe,
    UsePipes
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreReviewDto } from './dto/create-store-review.dto';
import { Review } from './entities/review.entity';
import { UpdateStoreReviewDto } from './dto/update-store-review.dto';
import { createReviewCommentDto } from './dto/create-review-comment.dto';

@Controller('stores')
export class StoresController {
    constructor(private readonly storesService: StoresService) { }

    // 리뷰 작성
    @Post('/review/:storeId')
    @UsePipes(ValidationPipe)
    async createReview(@Param('storeId', ParseIntPipe) storeId: number, @Body() createStoreReviewDto: CreateStoreReviewDto) {

        try {
            createStoreReviewDto.storeId = storeId;
            await this.storesService.createReview(createStoreReviewDto);
            return { errorCode: 0 }
        }
        catch (error) {
            return { errorCode: error.message };
        }
    }

    // 가게 리뷰 목록 조회
    @Get('/reviews/:storeId')
    async getAllReviews(@Param('storeId', ParseIntPipe) storeId: number) {
        try {
            const reviews = await this.storesService.findAllReview(storeId)
            return reviews
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

    // 리뷰 상세 조회
    @Get('/review/:reviewId')
    async getOneReview(@Param('reviewId', ParseIntPipe) reviewId: number) {
        try {
            const review = await this.storesService.findOneReview(reviewId)
            return review
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

    // 리뷰 수정
    @Patch('/review/:reviewId')
    @UsePipes(ValidationPipe)
    async updateReview(@Param('reviewId', ParseIntPipe) reviewId: number, @Body() updateStoreReviewDto: UpdateStoreReviewDto) {
        try {
            const review = await this.storesService.updateReview(reviewId, updateStoreReviewDto)
            return review
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

    // 리뷰 삭제
    @Delete('/review/:reviewId')
    async deleteReview(@Param('reviewId', ParseIntPipe) reviewId: number) {
        try {
                await this.storesService.removeReview(reviewId)
                return { errorCode : 0 }
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

    // 댓글 작성
    @Post('/review/comment/:reviewId')
    async createComment(@Param('reviewId', ParseIntPipe) reviewId: number, @Body() createReviewCommentDto: createReviewCommentDto) {
        try {
            await this.storesService.createComment(reviewId, createReviewCommentDto);
            return { errorCode : 0 }
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

    // 댓글 수정
    @Patch('/review/comment/:commentId')
    async updateComment(@Param('commentId', ParseIntPipe) commentId: number, @Body() createReviewCommentDto: createReviewCommentDto) {
        try {
            const comment = await this.storesService.updateComment(commentId, createReviewCommentDto);
            return comment
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

    // 댓글 삭제
    @Delete('/review/comment/:commentId')
    async deleteComment(@Param('commentId', ParseIntPipe) commentId: number) {
        try {
            await this.storesService.removeComment(commentId)
            return { errorCode : 0 }
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

}
