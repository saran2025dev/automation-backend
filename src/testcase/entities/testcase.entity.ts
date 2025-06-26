import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './Base.entity';

@Entity('testcases')
export class Testcase extends AbstractEntity {

  @Column({ length: 255,nullable:true })
  name: string;

  @Column({ length: 255, nullable: true })
  product: string;

  @Column({ type: 'jsonb' })
  steps: Step[];

  @Column({nullable:true})
  createdBy?:string

}
