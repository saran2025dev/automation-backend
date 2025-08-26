import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { ProjectRecordModule } from 'src/project-record/project-record.module';
import { ProjectRecordOutputModule } from 'src/project-record-output/project-record-output.module';
import { UserProjectsModule } from 'src/user-projects/user-projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, User]),
    ProjectRecordModule,
    ProjectRecordOutputModule,
    UserProjectsModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
