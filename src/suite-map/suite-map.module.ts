import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestcaseModule } from 'src/testcase/testcase.module';
import { SuiteMap } from './entities/suite-map.entity';
import { SuiteMapController } from './suite-map.controller';
import { SuiteMapService } from './suite-map.service';

@Module({
  imports:[TypeOrmModule.forFeature([SuiteMap]),TestcaseModule],
  controllers: [SuiteMapController],
  providers: [SuiteMapService],
})
export class SuiteMapModule {}
