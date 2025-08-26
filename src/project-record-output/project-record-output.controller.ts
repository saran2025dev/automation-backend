import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ProjectRecordOutputService } from './project-record-output.service';
import { CreateProjectRecordOutputDto, UpdateProjectRecordOutputDto } from './dto/create-project-record-output.dto';

@Controller('project-record-output')
export class ProjectRecordOutputController {
  constructor(private readonly service: ProjectRecordOutputService) {}

  @Post()
  create(@Body() dto: CreateProjectRecordOutputDto) {
    return this.service.create(dto);
  }
  

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectRecordOutputDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
