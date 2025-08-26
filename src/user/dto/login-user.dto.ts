import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email used for login',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'secure123',
    description: 'User password',
  })
  @IsString()
  password: string;
}
