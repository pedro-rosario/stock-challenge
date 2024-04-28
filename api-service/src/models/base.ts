import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class BaseModel {
  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;
}
