import { 
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Query,
    Delete,
    ParseIntPipe
 } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreReviewDto } from './dto/create-store-review.dto';
import { Review } from './entities/review.entity';
import { UpdateStoreReviewDto } from './dto/update-store-review.dto';
import { createReviewCommentDto } from './dto/create-review-comment.dto';

@Controller('stores')
export class StoresController {
    constructor(private readonly storesService: StoresService) {}

    // 리뷰 작성
    @Post('/review/:storeId')
    createReview(@Param('storeId', ParseIntPipe) storeId:number, @Body() createStoreReviewDto: CreateStoreReviewDto) {
        createStoreReviewDto.storeId = storeId;

        return this.storesService.createReview(createStoreReviewDto);
    }

    // 가게 리뷰 목록 조회
    @Get('/reviews/:storeId')
    getAllReviews(@Param('storeId', ParseIntPipe) storeId:number): Promise<Review[]> {
        return this.storesService.findAllReview(storeId)
    }

    // 리뷰 상세 조회
    @Get('/review/:reviewId')
    getOneReview(@Param('reviewId', ParseIntPipe) reviewId:number) {
        return this.storesService.findOneReview(reviewId)
    }

    // 리뷰 수정
    @Patch('/review/:reviewId')
    updateReview(@Param('reviewId', ParseIntPipe) reviewId:number, @Body() updateStoreReviewDto: UpdateStoreReviewDto) {
        return this.storesService.updateReview(reviewId, updateStoreReviewDto)
    }

    // 리뷰 삭제
    @Delete('/review/:reviewId')
    deleteReview(@Param('reviewId', ParseIntPipe) reviewId:number) {
        return this.storesService.removeReview(reviewId)
    }

    // 댓글 작성
    @Post('/review/comment/:reviewId')
    createComment(@Param('reviewId', ParseIntPipe) reviewId:number, @Body() createReviewCommentDto: createReviewCommentDto) {
        return this.storesService.createComment(reviewId, createReviewCommentDto);
    }
    
    // 댓글 수정
    @Patch('/review/comment/:commentId')
    updateComment(@Param('commentId', ParseIntPipe) commentId: number, @Body() createReviewCommentDto: createReviewCommentDto) {
        return this.storesService.updateComment(commentId, createReviewCommentDto);
    }

    // 댓글 삭제
    @Delete('/review/comment/:commentId')
    deleteComment(@Param('commentId', ParseIntPipe) commentId: number) {
        return this.storesService.removeComment(commentId);
    } 

}
