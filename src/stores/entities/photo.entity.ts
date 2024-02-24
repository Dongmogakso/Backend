import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , JoinColumn} from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    photoId: number;

    @Column()
    url: string;

    @ManyToOne(() => Review, review => review.photos)
    @JoinColumn({name: 'reviewId'})
    review: Review;

}