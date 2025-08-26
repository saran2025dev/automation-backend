import { Injectable } from '@nestjs/common';
import { CreateModuleDto, UpdateModuleDto } from './dto/create-module.dto';

@Injectable()
export class ModulesService {
  create(createModuleDto: CreateModuleDto) {
    return 'This action adds a new module';
  }

  findAll() {
    return `This action returns all modules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  update(id: number, updateModuleDto: UpdateModuleDto) {
    return `This action updates a #${id} module`;
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
