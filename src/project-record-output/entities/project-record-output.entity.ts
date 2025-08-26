import { Project } from 'src/project/entities/project.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('project_record_output')
export class ProjectRecordOutput {
    @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.id)
  project: Project;

  @Column({ type: 'text' })
  output: string;

  @CreateDateColumn()
  createdAt: Date;
}
