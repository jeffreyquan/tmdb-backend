import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Movie } from 'src/movies/entities/movie.entity';

export class CreateDirectorDto {
  @ApiProperty({ description: 'Name of the director' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Date of birth' })
  @IsString()
  dateOfBirth: string;

  @ApiProperty({ description: 'Date of death' })
  @IsString()
  dateOfDeath: string;

  @ApiProperty({ description: 'Place of birth' })
  @IsString()
  placeOfBirth: string;

  @ApiProperty({ description: 'Photo of the director' })
  @IsString()
  photo: string;

  @ApiProperty({ description: 'Movies directed' })
  movies: Movie[];

  @ApiProperty({ description: 'ID to link to IMDB' })
  @IsString()
  imdbId: string;

  @ApiProperty({ description: 'ID of director. We use the TMDB ID' })
  @IsNumber()
  id: number;
}
