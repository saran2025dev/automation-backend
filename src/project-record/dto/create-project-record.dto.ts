import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProjectRecordDto {
  @ApiProperty()
  projectId: string;

  @ApiProperty()
  createdBy: string;

  @ApiProperty({ required: false })
  testSuite?: string;

  @ApiProperty({ required: false })
  priority?: string;

  @ApiProperty({ required: false })
  data?: any;
}

export class UpdateProjectRecordDto extends PartialType(CreateProjectRecordDto) {}
