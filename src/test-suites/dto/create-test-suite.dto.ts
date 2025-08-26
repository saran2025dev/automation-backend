import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTestSuiteDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  moduleId: number;
}
export class UpdateTestSuiteDto extends PartialType(CreateTestSuiteDto) {}
