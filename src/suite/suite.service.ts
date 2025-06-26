import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSuiteDto } from './dto/create-suite.dto';
import { UpdateSuiteDto } from './dto/update-suite.dto';
import { Suite } from './entities/suite.entity';

@Injectable()
export class SuiteService {
  constructor(
    @InjectRepository(Suite)
    private readonly suiteRepository: Repository<Suite>,
  ) {}

  async create(createSuiteDto: CreateSuiteDto) {
    const created = this.suiteRepository.create({
      ...createSuiteDto,
      project: { id: createSuiteDto.projectId },
    });
    return this.suiteRepository.save(created);
  }

  async findAll() {
    return await this.suiteRepository.find();
  }

  async findOne(id: string) {
    return await this.suiteRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateSuiteDto: UpdateSuiteDto) {
    const suite = await this.findOne(id);
    const updated = this.suiteRepository.create({...suite,...updateSuiteDto});
    return this.suiteRepository.save(updated)
  }

  async remove(id: string) {
    return this.suiteRepository.softDelete(id);
  }

}
