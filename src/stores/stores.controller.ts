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
import { UpdateStoreReviewDto } from './dto/update-store-review.dto';
import { CreateReviewCommentDto } from './dto/create-review-comment.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'
import { GetStoreReviewsDto } from './dto/get-store-reviews.dto';
import { UpdateReviewCommentDto } from './dto/update-review-comment.dto';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
    constructor(private readonly storesService: StoresService) { }

    @ApiOperation({ summary: '리뷰 작성'})
    @Post('/review')
    @UsePipes(ValidationPipe)
    async createReview(@Body() createStoreReviewDto: CreateStoreReviewDto) {
        try {
            await this.storesService.createReview(createStoreReviewDto);
            return { errorCode: 0 }
        }
        catch (error) {
            return { errorCode: error.message };
        }
    }

    @ApiResponse({
        type: [GetStoreReviewsDto],
        description: 'success',
        status: 200,
    })
    @ApiOperation({ summary: '가게 리뷰 목록 조회'})
    @Get('/reviews/:storeId')
    async getAllReviews(@Param('storeId', ParseIntPipe) storeId: string) {
        try {
            const reviews = await this.storesService.findAllReview(storeId)
            return reviews
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

    @ApiResponse({
        type: GetStoreReviewsDto,
        description: 'success',
        status: 200,
    })
    @ApiOperation({ summary: '리뷰 상세 조회'})
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

    @ApiOperation({ summary: '리뷰 수정'})
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

    @ApiOperation({ summary: '리뷰 삭제'})
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

    @ApiOperation({ summary: '댓글 작성'})
    @Post('/review/comment/:reviewId')
    async createComment(@Param('reviewId', ParseIntPipe) reviewId: number, @Body() createReviewCommentDto: CreateReviewCommentDto) {
        try {
            await this.storesService.createComment(reviewId, createReviewCommentDto);
            return { errorCode : 0 }
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

    @ApiOperation({ summary: '댓글 수정'})
    @Patch('/review/comment/:commentId')
    async updateComment(@Param('commentId', ParseIntPipe) commentId: number, @Body() updateReviewCommentDto: UpdateReviewCommentDto) {
        try {
            const comment = await this.storesService.updateComment(commentId, updateReviewCommentDto);
            return comment
        }
        catch (error) {
            return { errorCode: error.message }
        }
    }

    @ApiOperation({ summary: '댓글 삭제'})
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
