import { User } from 'src/auth/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Store } from './store.entity';
import { Photo } from './photo.entity';
import { Comment } from './comment.entity';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    reviewId: number;
    
    @ManyToOne(() => Store, store => store.reviews)
    @JoinColumn({ name: 'storeId' })
    store: Store;

    @ManyToOne(() => User, user => user.reviews)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    rating: number;

    @CreateDateColumn({name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => Photo, photo => photo.review)
    photos: Photo[];

    @OneToMany(() => Comment, comment => comment.review)
    comments: Comment[];
}