import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { UserProjectsService } from './user-projects.service';
import { CreateUserProjectDto, UpdateUserProjectDto } from './dto/create-user-project.dto';

@Controller('user-projects')
export class UserProjectsController {
  constructor(private readonly service: UserProjectsService) {}

  @Post()
  create(@Body() dto: CreateUserProjectDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateUserProjectDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
