import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StockMarket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true, type: 'date'})
  date: string;

  @Column()
  trade_code: string;

  @Column({type: 'double'})
  high: number;
  
  @Column({type: 'double'})
  low: number;
  
  @Column({type: 'double'})
  open: number;

  @Column({type: 'double'})
  close: number;

  @Column({type: 'double'})
  volume: number;
}