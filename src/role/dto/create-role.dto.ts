import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsDate } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Admin', description: 'Name of the role' })
  @IsString()
  name: string;

  @ApiProperty({
    example: false,
    description: 'Whether this role is allowed to create projects',
  })
  @IsBoolean()
  isCreationAllowed: boolean;

  @ApiProperty({ example: new Date(), description: 'Creation timestamp', readOnly: true })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ example: new Date(), description: 'Update timestamp', readOnly: true })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
