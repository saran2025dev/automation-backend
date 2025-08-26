import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { TestSuite } from 'src/test-suites/entities/test-suite.entity';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';

@Entity('project_record')
export class ProjectRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, { eager: true })
  project: Project;

  @ManyToOne(() => User, { eager: true })
  createdBy: User;

  @ManyToOne(() => TestSuite, { eager: true, nullable: true })
  testSuite: TestSuite;

  @Column({ nullable: true })
  priority: string;

  @Column({ type: 'json', nullable: true })
  data: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
