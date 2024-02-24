import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from 'src/stores/entities/review.entity';
import { Comment } from 'src/stores/entities/comment.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

    @OneToMany(() => Schedule, schedule => schedule.user)
    schedules: Schedule[];
}