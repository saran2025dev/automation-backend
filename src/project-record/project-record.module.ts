import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRecordService } from './project-record.service';
import { ProjectRecord } from './entities/project-record.entity';
import { ProjectRecordController } from './project-record.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRecord])],
  controllers: [ProjectRecordController],
  providers: [ProjectRecordService],
  exports: [ProjectRecordService],
})
export class ProjectRecordModule {}
