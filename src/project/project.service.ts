import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectRecordService } from 'src/project-record/project-record.service';
import { ProjectRecordOutputService } from 'src/project-record-output/project-record-output.service';
import { UserProjectsService } from 'src/user-projects/user-projects.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly projectRecordService: ProjectRecordService,
    private readonly projectRecordOutputService: ProjectRecordOutputService,
    private readonly userProjectsService: UserProjectsService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,) { }

  async create(createProjectDto: CreateProjectDto, creatorId: string) {
    const creator = await this.userRepo.findOne({
      where: { id: creatorId },
      relations: ['role'],
    });

    if (!creator) {
      throw new Error('Creator not found');
    }

    if (creator.role.name !== 'Admin') {
      throw new Error('Only Admin can create a project');
    }

    const count = await this.projectRepository.count();
    const nextId = `PRJ-${String(count + 1).padStart(3, '0')}`;

    const project = this.projectRepository.create({
      ...createProjectDto,
      uniqueProjectId: nextId,
      createdBy: creator,
    });

    const savedProject = await this.projectRepository.save(project);

    await this.projectRecordService.create({
      projectId: savedProject.id,
      createdBy: creator.id,
      testSuite: undefined,
      priority: 'Medium',
      data: '{}',
    });

    await this.projectRecordOutputService.create({
      projectId: savedProject.id,
      output: '{}',
    });

    return savedProject;
  }


  async findAll(userId?: string, isAdmin?: boolean) {
    if (isAdmin) {
      return await this.projectRepository.find({ relations: ['suite'] });
    }

    if (!userId) {
      return [];
    }

    const userProjectRecords = await this.userProjectsService.findByUserId(userId);

    if (!userProjectRecords || userProjectRecords.length === 0) {
      return [];
    }

    const projectIds = Array.from(new Set(userProjectRecords.map((r) => r.project.id)));

    const projects = await this.projectRepository.find({
      where: { id: In(projectIds) },
      relations: ['suite'],
    });

    return projects;
  }

  async findOne(id: string) {
    return await this.projectRepository.findOne({ where: { id: id } });
  }
  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);

    if (!project) throw new Error(`Project with id ${id} not found`);

    const updated = {
      ...project,
      ...updateProjectDto,
      createdBy: updateProjectDto.createdBy
        ? { id: updateProjectDto.createdBy }
        : project.createdBy,
    };

    return this.projectRepository.save(updated);
  }

  async remove(id: string) {
    const result = await this.projectRepository.delete(id);

    if (result.affected === 0) {
      return { message: `Project with id ${id} not found` };
    }

    return { message: `Project with id ${id} deleted successfully (hard delete)` };
  }

  async assignUsers(projectId: string, userIds: string[]) {
    const promises = userIds.map((userId) =>
      this.userProjectsService.create({ userId, projectId }),
    );
    await Promise.all(promises);
    return { message: 'Users assigned successfully' };
  }

  async findProjectsByUser(userId: string) {
  return this.userProjectsService.findByUserId(userId);
}
}
