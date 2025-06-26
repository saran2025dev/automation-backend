import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestcaseService } from 'src/testcase/testcase.service';
import { Repository } from 'typeorm';
import { CreateSuiteMapDto } from './dto/create-suite-map.dto';
import { UpdateSuiteMapDto } from './dto/update-suite-map.dto';
import { SuiteMap } from './entities/suite-map.entity';

@Injectable()
export class SuiteMapService {
  constructor(
    @InjectRepository(SuiteMap)
    private readonly suiteRepository: Repository<SuiteMap>,
    private readonly testcaseService: TestcaseService,
  ) {}

  async create(createSuiteMapDto: CreateSuiteMapDto) {
    const mappingCreated = this.suiteRepository.create({
      suite: { id: createSuiteMapDto.suiteId },
      testcase: { id: createSuiteMapDto.testcaseId },
    });
    return await this.suiteRepository.save(mappingCreated);
  }

  async findAll() {
    return await this.suiteRepository.find({ relations: ['testcase'] });
  }

  async findOne(id: string) {
    return await this.suiteRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateSuiteMapDto: UpdateSuiteMapDto) {
    const mappedById = await this.findOne(id);
    const updated = { ...mappedById, ...updateSuiteMapDto };
    const created = this.suiteRepository.create({ ...updated });
    return await this.suiteRepository.save(created);
  }

  async remove(id: string) {
    return await this.suiteRepository.softDelete(id);
  }

  async runBySuite(id: string) {
    const testcaseBySuites = await this.suiteRepository.find({
      where: { suiteId: id },
      relations: ['testcase'],
    });

    testcaseBySuites.forEach(test => {
      this.testcaseService.runSingleTestCase({...test.testcase});
    })
    return "running successfully";
  }
}
