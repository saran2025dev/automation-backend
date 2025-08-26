import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateModuleDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  projectId: string;
}
export class UpdateModuleDto extends PartialType(CreateModuleDto) {}
