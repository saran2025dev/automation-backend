import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectRecordService } from './project-record.service';
import { CreateProjectRecordDto, UpdateProjectRecordDto } from './dto/create-project-record.dto';

@Controller('project-record')
export class ProjectRecordController {
  constructor(private readonly projectRecordService: ProjectRecordService) {}

  @Post()
  create(@Body() createProjectRecordDto: CreateProjectRecordDto) {
    return this.projectRecordService.create(createProjectRecordDto);
  }

  @Get()
  findAll() {
    return this.projectRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectRecordService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectRecordDto: UpdateProjectRecordDto) {
    return this.projectRecordService.update(id, updateProjectRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectRecordService.remove(id);
  }
}
