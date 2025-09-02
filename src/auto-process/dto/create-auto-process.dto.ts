import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAutoProcessDto {
  @ApiProperty({ example: 'royalSundaram', description: 'Name of the company' })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'Car', description: 'Name of the process' })
  @IsNotEmpty()
  product: string;
  @ApiProperty({
    type: 'array',
    description: 'List of steps for the automation process',
    example: [
      { method: 'gotoPage', url: 'https://example.com' },
      { method: 'fillInput', selector: '#username', value: 'testUser' },
    ],
  })
  @IsNotEmpty()
  steps: Step[];
}
