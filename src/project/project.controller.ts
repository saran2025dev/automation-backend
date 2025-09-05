import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    const creatorId = req.user?.id
    return this.projectService.create(createProjectDto, creatorId);
  }

  @Post(':projectId/assign')
  async assignUsers(
    @Param('projectId') projectId: string,
    @Body() userIds: string[],
  ) {
    return this.projectService.assignUsers(projectId, userIds);
  }

  @Get('project/:userId')
  async findProjectsByUser(@Param('userId') userId: string) {
    return this.projectService.findProjectsByUser(userId);
  }


  @Get(':userId/role/:role')
  async findByUser(
    @Param('userId') userId: string,
    @Param('role') role: string) {

    const isAdmin = role?.toLowerCase() === 'admin';

    return this.projectService.findAll(userId,isAdmin);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
