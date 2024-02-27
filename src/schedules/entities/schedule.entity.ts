import { User } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Place } from './place.entity';

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    scheduleId: number;

    @Column()
    name: string;

    @Column()
    startDate: string;
    
    @Column()
    endDate: string;

    @ManyToOne(() => User, user => user.schedules)
    @JoinColumn({name: 'userId'})
    user: User;

    @OneToMany(() => Place, place => place.schedule)
    places: Place[];
}