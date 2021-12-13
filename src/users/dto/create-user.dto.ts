import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'User email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'User email verified' })
  @IsEmail()
  readonly emailVerified: boolean;
}
