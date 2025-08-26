import { Injectable } from '@nestjs/common';
import { CreateTestSuiteDto, UpdateTestSuiteDto } from './dto/create-test-suite.dto';

@Injectable()
export class TestSuitesService {
  create(createTestSuiteDto: CreateTestSuiteDto) {
    return 'This action adds a new testSuite';
  }

  findAll() {
    return `This action returns all testSuites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testSuite`;
  }

  update(id: number, updateTestSuiteDto: UpdateTestSuiteDto) {
    return `This action updates a #${id} testSuite`;
  }

  remove(id: number) {
    return `This action removes a #${id} testSuite`;
  }
}
