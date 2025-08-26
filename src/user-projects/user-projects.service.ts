import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProjects } from './entities/user-project.entity';
import { CreateUserProjectDto, UpdateUserProjectDto } from './dto/create-user-project.dto';

@Injectable()
export class UserProjectsService {
  constructor(
    @InjectRepository(UserProjects)
    private repo: Repository<UserProjects>,
  ) {}

async create(dto: CreateUserProjectDto) {
  const entity = this.repo.create({
    user: { id: dto.userId } as any,
    project: { id: dto.projectId } as any,
    assignedAt: new Date(),
  });
  return this.repo.save(entity);
}

findAll() {
  return this.repo.find({ relations: ['user', 'project'] });
}

findOne(id: string) {
  return this.repo.findOne({ where: { id }, relations: ['user', 'project'] });
}

async update(id: string, dto: UpdateUserProjectDto) {
  const entity = await this.repo.preload({
    id,
    user: dto.userId ? { id: dto.userId } : undefined,
    project: dto.projectId ? { id: dto.projectId } : undefined,
  });
  if (!entity) throw new Error('UserProject not found');
  return this.repo.save(entity);
}

remove(id: string) {
  return this.repo.softDelete(id);
}

}
