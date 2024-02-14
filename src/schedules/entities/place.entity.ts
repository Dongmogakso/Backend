import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Schedule } from './schedule.entity';
import { Store } from 'src/stores/entities/store.entity';

@Entity()
export class Place {
    @PrimaryGeneratedColumn()
    placeId: number;

    @Column()
    date: string;

    @Column()
    time: string;

    @ManyToOne(() => Schedule, schedule => schedule.places)
    @JoinColumn({name: 'scheduleId'})
    schedule: Schedule;

    @ManyToOne(() => Store, store => store.places)
    @JoinColumn({name: 'storeId'})
    store: Store;

}