import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoProcessController } from './auto-process.controller';
import { AutoProcessService } from './auto-process.service';

@Module({
  controllers: [AutoProcessController],
  providers: [AutoProcessService],
})
export class AutoProcessModule {}
