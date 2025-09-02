import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectRecord } from './entities/project-record.entity';
import { CreateProjectRecordDto, UpdateProjectRecordDto } from './dto/create-project-record.dto';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { Suite } from 'src/suite/entities/suite.entity';

@Injectable()
export class ProjectRecordService {
  constructor(
    @InjectRepository(ProjectRecord)
  private readonly repo: Repository<ProjectRecord>, 
  ) {}

  async create(dto: CreateProjectRecordDto) {
    const record = this.repo.create({
      project: { id: dto.projectId } as Partial<Project>,
      createdBy: { id: dto.createdBy } as Partial<User>,
      testSuite: dto.testSuite ? ({ id: dto.testSuite } as Partial<Suite>) : undefined,
      priority: dto.priority || undefined,
      data: dto.data || {},
    });

    return this.repo.save(record);
  }

  findAll() {
    return this.repo.find({ relations: ['project', 'createdBy', 'testSuite'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['project', 'createdBy', 'testSuite'] });
  }

    async findBySuiteId(suiteId: string) {
    return this.repo.find({
      where: { testSuite: { id: suiteId }},
      relations: ['project'], // include relations if needed
    });
  }



async update(id: string, dto: UpdateProjectRecordDto) {
  const record = await this.findOne(id);
  if (!record) throw new Error(`ProjectRecord ${id} not found`);

  if (dto.projectId !== undefined) record.project = { id: dto.projectId } as Project;
  if (dto.createdBy !== undefined) record.createdBy = { id: dto.createdBy } as User;
  if (dto.testSuite !== undefined) record.testSuite = { id: dto.testSuite } as Suite;

  if (dto.priority !== undefined) record.priority = dto.priority;
  if (dto.data !== undefined) record.data = dto.data;

  return this.repo.save(record);
}


  remove(id: string) {
    return this.repo.softDelete(id);
  }
}
