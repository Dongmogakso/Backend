import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Review } from './review.entity';
import { Place } from 'src/schedules/entities/place.entity';

@Entity()
export class Store {
    @PrimaryColumn()
    storeId: string;

    @Column()
    storeName: string;

    @Column()
    storeUrl: string;

    @Column()
    categoryName: string;

    @Column()
    addressName: string;

    @Column()
    roadAddressName: string;

    @Column()
    phone: string;

    @OneToMany(() => Review, review => review.store)
    reviews: Review[];

    @OneToMany(() => Place, place => place.store)
    places: Place[];
}