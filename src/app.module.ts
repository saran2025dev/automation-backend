import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { ProjectModule } from './project/project.module';
import { SuiteMapModule } from './suite-map/suite-map.module';
import { SuiteModule } from './suite/suite.module';
import { TestcaseModule } from './testcase/testcase.module';
import { UserModule } from './user/user.module';
import { UserProjectsModule } from './user-projects/user-projects.module';
import { ModulesModule } from './modules/modules.module';
import { TestSuitesModule } from './test-suites/test-suites.module';
import { ProjectRecordModule } from './project-record/project-record.module';
import { ProjectRecordOutputModule } from './project-record-output/project-record-output.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TestcaseModule,
    UserModule,
    ProjectModule,
    SuiteModule,
    SuiteMapModule,
    UserProjectsModule,
    ModulesModule,
    TestSuitesModule,
    ProjectRecordModule,
    ProjectRecordOutputModule,
    RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
