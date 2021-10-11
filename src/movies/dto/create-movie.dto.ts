import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ description: 'ID of movie. We use the TMDB ID' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ description: 'Title of the movie' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'Overview of the movie' })
  @IsString()
  readonly overview: string;

  @ApiProperty({ description: 'Year movie was released' })
  @IsDateString()
  readonly releaseDate: string;

  @ApiProperty({ example: 'Length of movie in minutes' })
  @IsNumber()
  readonly duration: number;

  @ApiProperty({ description: 'Background image of the movie' })
  @IsString()
  readonly backdrop: string;

  @ApiProperty({ description: 'Poster of the movie' })
  @IsString()
  readonly poster: string;

  @ApiProperty({ description: 'ID to link to IMDB' })
  @IsString()
  readonly imdbId: string;

  @ApiProperty({ description: 'TMDB IDs of actors' })
  readonly actorIds: number[];

  @ApiProperty({ description: 'TMDB ID of director' })
  readonly directorId: number;

  @ApiProperty({ description: 'Genres of the movie' })
  @IsString({ each: true })
  readonly genres: string[];
}
