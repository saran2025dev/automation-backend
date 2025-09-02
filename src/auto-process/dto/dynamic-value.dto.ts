import { ApiProperty } from '@nestjs/swagger';

export class DynamicValuesDto {
  @ApiProperty() regno1: string;
  @ApiProperty() regno2: string;
  @ApiProperty() regno3: string;
  @ApiProperty() regno4: string;
  @ApiProperty() make: string;
  @ApiProperty() model: string;
  @ApiProperty() previousPolicyType: string;
  @ApiProperty() claimsFreeYears: string;
  @ApiProperty() year: string;
  @ApiProperty() month: string;
  @ApiProperty() date: string;
  @ApiProperty() firstName: string;
  @ApiProperty() lastName: string;
  @ApiProperty() mobileNumber: string;
}
