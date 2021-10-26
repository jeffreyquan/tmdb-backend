import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ description: 'ID of movie. We use the TMDB ID' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    description: 'Genre name',
  })
  @IsString()
  readonly name: string;
}
