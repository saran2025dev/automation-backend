import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateSuiteMapDto {
  @ApiProperty({
    description: 'The ID of the suite',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  suiteId: string;

  @ApiProperty({
    description: 'The ID of the test case (QuoteMaster)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  testcaseId: string;
}
