import { Suite } from 'src/suite/entities/suite.entity';
import { Testcase } from 'src/testcase/entities/testcase.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('suite_maps')
export class SuiteMap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Suite, (suite) => suite)
  @JoinColumn({name:"suiteId"})
  suite: Suite;

  @Column()
  suiteId:string;

  @ManyToOne(() => Testcase, (testCase) => testCase)
  @JoinColumn({name:"testcaseId"})
  testcase: Testcase;

  @Column()
  testcaseId:string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
