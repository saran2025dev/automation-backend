import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestSuitesService } from './test-suites.service';
import { CreateTestSuiteDto, UpdateTestSuiteDto } from './dto/create-test-suite.dto';

@Controller('test-suites')
export class TestSuitesController {
  constructor(private readonly testSuitesService: TestSuitesService) {}

  @Post()
  create(@Body() createTestSuiteDto: CreateTestSuiteDto) {
    return this.testSuitesService.create(createTestSuiteDto);
  }

  @Get()
  findAll() {
    return this.testSuitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testSuitesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestSuiteDto: UpdateTestSuiteDto) {
    return this.testSuitesService.update(+id, updateTestSuiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testSuitesService.remove(+id);
  }
}
