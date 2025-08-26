import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserProjectDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  projectId: string;
}

export class UpdateUserProjectDto extends PartialType(CreateUserProjectDto) {}
