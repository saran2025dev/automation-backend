import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class Step {
  @ApiProperty({
    example: 'gotoPage',
    description: 'The method to execute',
  })
  @IsNotEmpty()
  method: string;

  @ApiProperty({
    example: 'https://example.com',
    description: 'URL for the gotoPage method',
    required: false,
  })
  url?: string;

  @ApiProperty({
    example: '#username',
    description: 'Selector for the fillInput method',
    required: false,
  })
  selector?: string;

  @ApiProperty({
    example: 'testUser',
    description: 'Value for the fillInput method',
    required: false,
  })
  value?: string;
}

export class CreateTestcaseDto {
  @ApiProperty({
    example: 'Google Home Page',
    description: 'Give Unique Name to identify autonation script',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Google',
    description: 'Name of the product',
  })
  @IsNotEmpty()
  product: string;

  @ApiProperty({
    type: [Step],
    description: 'List of steps for the automation process',
    example: [
      { method: 'gotoPage', url: 'https://www.google.com' },
      { method: 'fillInput', selector: '#username', value: 'testUser' },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Step)
  steps: Step[];

  @ApiProperty({
    example: 'thaher@ideassion.com',
    description: 'Created By User JSON',
  })
  @IsOptional()
  createdBy: string;
}

export class StepsDto {
  @ApiProperty({
    type: [Step],
    description: 'List of steps for the automation process',
    example: [
      { method: 'gotoPage', url: 'https://www.google.com' },
      { method: 'fillInput', selector: '#username', value: 'testUser' },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Step)
  steps: Step[];
}
