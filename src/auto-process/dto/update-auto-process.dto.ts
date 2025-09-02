import { PartialType } from '@nestjs/mapped-types';
import { CreateAutoProcessDto } from './create-auto-process.dto';

export class UpdateAutoProcessDto extends PartialType(CreateAutoProcessDto) {}
