import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({
    description: 'Genre name',
  })
  @IsString()
  readonly name: string;
}
