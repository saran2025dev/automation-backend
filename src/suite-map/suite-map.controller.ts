import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSuiteMapDto } from './dto/create-suite-map.dto';
import { UpdateSuiteMapDto } from './dto/update-suite-map.dto';
import { SuiteMapService } from './suite-map.service';

@Controller('suite-map')
export class SuiteMapController {
  constructor(private readonly suiteMapService: SuiteMapService) {}

  @Post()
  create(@Body() createSuiteMapDto: CreateSuiteMapDto) {
    return this.suiteMapService.create(createSuiteMapDto);
  }

  @Get()
  findAll() {
    return this.suiteMapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suiteMapService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuiteMapDto: UpdateSuiteMapDto) {
    return this.suiteMapService.update(id, updateSuiteMapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suiteMapService.remove(id);
  }

  @Get('runBySuite/:id')
  runBySuite(@Param('id') id: string) {
    return this.suiteMapService.runBySuite(id);
  }
}
