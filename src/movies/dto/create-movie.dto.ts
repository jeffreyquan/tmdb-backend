import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ description: 'Title of the movie' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Overview of the movie' })
  @IsString()
  overview: string;

  @ApiProperty({ description: 'Year movie was released' })
  @IsNumber()
  year: number;

  @ApiProperty({ example: 'Length of movie in minutes' })
  @IsNumber()
  duration: number;

  @ApiProperty({ description: 'Background image of the movie' })
  @IsString()
  backdrop: string;

  @ApiProperty({ description: 'Poster of the movie' })
  @IsString()
  poster: string;

  @ApiProperty({ description: 'ID to link to IMDB' })
  @IsString()
  imdb_id: string;

  @ApiProperty({ description: 'ID to link to TMDB' })
  @IsNumber()
  tmdb_id: number;
}
