import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'E-commerce Platform',
    description: 'The name of the project',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Development of a new e-commerce platform',
    description: 'Project description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the project is active',
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    example: '3f72b144-f36b-4326-8a89-ce8e6f77ff37',
    description: 'ID of the user who created this project',
  })
  @IsNotEmpty()
  @IsUUID()
  createdBy: string;
}

export class AssignUsersDto {
  @ApiProperty({
    type: [String],
    example: ['c3cdd408-0401-43f8-8ad3-aab16e351e7c'],
    description: 'Array of user ids to assign to the project',
  })
  @IsString({ each: true })
  userIds: string[];
}