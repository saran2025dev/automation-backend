import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { ProjectModule } from './project/project.module';
import { SuiteModule } from './suite/suite.module';
import { UserModule } from './user/user.module';
import { UserProjectsModule } from './user-projects/user-projects.module';
import { ProjectRecordModule } from './project-record/project-record.module';
import { ProjectRecordOutputModule } from './project-record-output/project-record-output.module';
import { RoleModule } from './role/role.module';
import { AutoProcessModule } from './auto-process/auto-process.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    ProjectModule,
    ProjectRecordModule,
    ProjectRecordOutputModule,
    SuiteModule,
    UserProjectsModule,
    RoleModule,
    AutoProcessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
