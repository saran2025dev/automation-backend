import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSuiteDto } from './dto/create-suite.dto';
import { UpdateSuiteDto } from './dto/update-suite.dto';
import { SuiteService } from './suite.service';

@Controller('suite')
export class SuiteController {
  constructor(private readonly suiteService: SuiteService) { }

  @Post()
  create(@Body() createSuiteDto: CreateSuiteDto) {
    return this.suiteService.create(createSuiteDto);
  }

  @Get()
  findAll() {
    return this.suiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suiteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuiteDto: UpdateSuiteDto) {
    return this.suiteService.update(id, updateSuiteDto);
  }

  @Get('project/:projectId')
  findByProjectId(@Param('projectId') projectId: string) {
    return this.suiteService.findByProjectId(projectId);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suiteService.remove(id);
  }
}
