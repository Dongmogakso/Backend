import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
    @PrimaryGeneratedColumn()
    storeId: number;

    @Column()
    storeName: string;
}