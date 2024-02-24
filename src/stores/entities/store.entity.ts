import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';
import { Place } from 'src/schedules/entities/place.entity';

@Entity()
export class Store {
    @PrimaryGeneratedColumn()
    storeId: number;

    @Column()
    storeName: string;

    @Column()
    type: string;

    @Column()
    location: string;

    @Column()
    description: string;

    @OneToMany(() => Review, review => review.store)
    reviews: Review[];

    @OneToMany(() => Place, place => place.store)
    places: Place[];
}