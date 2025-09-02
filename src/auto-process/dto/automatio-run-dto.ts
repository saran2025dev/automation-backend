import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class RunAutomationDto {
  @ApiProperty({example:"Hi"})
  @IsString()
  @MinLength(1)
  value!: string; // the only thing the client sends
}