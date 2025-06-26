import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suite } from './entities/suite.entity';
import { SuiteController } from './suite.controller';
import { SuiteService } from './suite.service';

@Module({
  imports:[TypeOrmModule.forFeature([Suite])],
  controllers: [SuiteController],
  providers: [SuiteService],
})
export class SuiteModule {}
