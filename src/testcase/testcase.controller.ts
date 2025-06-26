import {
  Body,
  Controller,
  Get,
  Post
} from '@nestjs/common';
import { CreateTestcaseDto, StepsDto } from './dto/create-testcase.dto';
import { TestcaseService } from './testcase.service';

@Controller('testcase')
export class TestcaseController {
  constructor(private readonly testcaseService: TestcaseService) {}

  @Get('methods')
  methods() {
    return this.testcaseService.methodDropDown();
  }

  @Post()
  async create(@Body() dto:CreateTestcaseDto) {
    return await this.testcaseService.create(dto);
  }

  @Get()
  async find() {
    return await this.testcaseService.find();
  }

  @Post('runSingleTestCase')
  async runSingleTestCase(@Body() dto:StepsDto) {
    return await this.testcaseService.runSingleTestCase(dto);
  }
}
