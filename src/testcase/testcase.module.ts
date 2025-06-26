import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testcase } from './entities/testcase.entity';
import { TestcaseController } from './testcase.controller';
import { TestcaseService } from './testcase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Testcase])],
  controllers: [TestcaseController],
  providers: [TestcaseService],
  exports:[TestcaseService]
})
export class TestcaseModule {}
