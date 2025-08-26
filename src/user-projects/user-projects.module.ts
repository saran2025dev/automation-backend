import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProjectsService } from './user-projects.service';
import { UserProjectsController } from './user-projects.controller';
import { UserProjects } from './entities/user-project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProjects])],
  controllers: [UserProjectsController],
  providers: [UserProjectsService],
  exports: [UserProjectsService],
})
export class UserProjectsModule {}
