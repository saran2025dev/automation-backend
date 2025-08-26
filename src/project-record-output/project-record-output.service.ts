import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRecordOutput } from './entities/project-record-output.entity';
import { CreateProjectRecordOutputDto, UpdateProjectRecordOutputDto } from './dto/create-project-record-output.dto';

@Injectable()
export class ProjectRecordOutputService {
  constructor(
    @InjectRepository(ProjectRecordOutput)
    private repo: Repository<ProjectRecordOutput>,
  ) { }

  async create(dto: CreateProjectRecordOutputDto) {
    const entity = this.repo.create({
      output: dto.output,
      project: { id: dto.projectId },
    });
    return this.repo.save(entity);
  }


  findAll() {
    return this.repo.find({ relations: ['project'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['project'] });
  }

  async update(id: string, dto: UpdateProjectRecordOutputDto) {
    const entity = await this.repo.preload({
      id,
      project: dto.projectId ? { id: dto.projectId } : undefined,
      output: dto.output,
    });
    if (!entity) throw new Error('ProjectRecordOutput not found');
    return this.repo.save(entity);
  }

  remove(id: string) {
    return this.repo.softDelete(id);
  }
}
