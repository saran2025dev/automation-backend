import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProjectRecordOutputDto {
  @ApiProperty()
  projectId: string;

  @ApiProperty()
  output: string;
}
export class UpdateProjectRecordOutputDto extends PartialType(CreateProjectRecordOutputDto) {}
