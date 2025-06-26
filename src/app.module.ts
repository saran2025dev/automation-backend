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

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TestcaseModule,
    UserModule,
    ProjectModule,
    SuiteModule,
    SuiteMapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
