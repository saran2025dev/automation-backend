// src/role/role.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto/create-role.dto';
import { Role } from './entity/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  create(dto: CreateRoleDto) {
    const role = this.roleRepo.create(dto);
    return this.roleRepo.save(role);
  }

  findAll() {
    return this.roleRepo.find();
  }

  findOne(id: string) {
    return this.roleRepo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateRoleDto) {
    const role = await this.roleRepo.preload({ id, ...dto });
    if (!role) throw new Error('Role not found');
    return this.roleRepo.save(role);
  }

  remove(id: string) {
    return this.roleRepo.softDelete(id);
  }
}
