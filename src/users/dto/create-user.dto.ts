import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Auth0 ID' })
  @IsString()
  readonly id: string;

  @ApiProperty({ description: 'Username' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'User email' })
  @IsEmail()
  readonly email: string;
}
