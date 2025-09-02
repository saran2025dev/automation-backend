import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export const DEFAULT_DELETED_TOKEN_ID = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deletedAt: Date;

  @Column({ type: 'uuid', default: DEFAULT_DELETED_TOKEN_ID })
  deletedTokenId: string;
}

export abstract class MasterBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
