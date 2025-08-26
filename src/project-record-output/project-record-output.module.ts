import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRecordOutputService } from './project-record-output.service';
import { ProjectRecordOutputController } from './project-record-output.controller';
import { ProjectRecordOutput } from './entities/project-record-output.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRecordOutput])],
  controllers: [ProjectRecordOutputController],
  providers: [ProjectRecordOutputService],
  exports: [ProjectRecordOutputService],
})
export class ProjectRecordOutputModule {}
