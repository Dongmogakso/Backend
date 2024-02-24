import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/auth/entity/user.entity';
import { Review } from './review.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    commentId: number;
    
    @Column()
    content: string;

    @CreateDateColumn({name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({name: 'userId'})
    user: User;

    @ManyToOne(() => Review, review => review.comments)
    @JoinColumn({name: 'reviewId'})
    review: Review;
    
}