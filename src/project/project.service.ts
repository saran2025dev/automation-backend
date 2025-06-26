import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = this.projectRepository.create({ ...createProjectDto });
    return await this.projectRepository.save(project);
  }

  async findAll() {
    return await this.projectRepository.find({relations:['suite']});
  }

  async findOne(id: string) {
    return await this.projectRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);

    const updated = {...project,...updateProjectDto}

    console.log("after updated")
    console.log(updated)
    return this.projectRepository.save(updated);
  }

  async remove(id: string) {
    return this.projectRepository.softDelete(id);
  }
}
