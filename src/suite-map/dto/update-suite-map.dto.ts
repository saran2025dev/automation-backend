import { PartialType } from '@nestjs/swagger';
import { CreateSuiteMapDto } from './create-suite-map.dto';

export class UpdateSuiteMapDto extends PartialType(CreateSuiteMapDto) {}
