import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRecordService } from './project-record.service';
import { ProjectRecord } from './entities/project-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRecord])],
  providers: [ProjectRecordService],
  exports: [ProjectRecordService],
})
export class ProjectRecordModule {}
