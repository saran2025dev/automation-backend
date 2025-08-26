import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Modules } from 'src/modules/entities/module.entity';

@Entity('test_suites')
@Entity('test_suites')
export class TestSuite {
  @PrimaryGeneratedColumn()  // default is number
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @ManyToOne(() => Modules, (module) => module.id)
  module: Modules;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
