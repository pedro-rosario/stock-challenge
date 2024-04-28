import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base';
import { StockHistory } from './history';
import { USER_ROLE } from '../constants';

@Entity('User')
export class User extends BaseModel {
  @PrimaryColumn({ name: 'email', length: 255, nullable: false })
  email: string;

  @Column('varchar', { name: 'role', length: 20, nullable: false })
  role: USER_ROLE;

  @Column('varchar', { name: 'password', length: 255, nullable: false })
  password: string;

  @OneToMany(() => StockHistory, (stockHistory) => stockHistory.user)
  history: StockHistory[];
}
