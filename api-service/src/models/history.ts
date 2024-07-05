import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Generated,
} from 'typeorm';
import { BaseModel } from './base';
import { User } from './user';

@Entity('StockHistory')
export class StockHistory extends BaseModel {
  @PrimaryColumn({ name: 'id' })
  @Generated('increment')
  id: number;

  @Column('varchar', { name: 'date', length: 255, nullable: false })
  date: string;

  @Column('varchar', { name: 'time', length: 255, nullable: false })
  time: string;

  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @Column('varchar', { name: 'symbol', length: 255, nullable: false })
  symbol: string;

  @Column('int', { name: 'open', nullable: false })
  open: number;

  @Column('int', { name: 'high', nullable: false })
  high: number;

  @Column('int', { name: 'low', nullable: false })
  low: number;

  @Column('int', { name: 'close', nullable: false })
  close: number;

  @ManyToOne(() => User, (user) => user.history, {
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'user_email' })
  user: User;
}
