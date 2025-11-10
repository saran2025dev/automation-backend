import { IsEmail, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'saran@example.com',
        description: 'Email address of the user',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'John Deere',
        description: '',
    })
    @IsString()
    username: string;


    @ApiProperty({
        example: 'secure123',
        description: 'Password (minimum 6 characters)',
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    password: string;


    @ApiProperty()
    @IsString()
    roleId: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
