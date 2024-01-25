import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    reviewId: number;
    
    @Column()
    storeId: number;

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

}