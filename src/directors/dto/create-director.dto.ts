import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Movie } from 'src/movies/entities/movie.entity';

export class CreateDirectorDto {
  @ApiProperty({ description: 'Name of the director' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Date of birth' })
  @IsString()
  date_of_birth: string;

  @ApiProperty({ description: 'Date of death' })
  @IsString()
  date_of_death: string;

  @ApiProperty({ description: 'Place of birth' })
  @IsString()
  place_of_birth: string;

  @ApiProperty({ description: 'Photo of the director' })
  @IsString()
  photo: string;

  @ApiProperty({ description: 'Movies directed' })
  movies: Movie[];

  @ApiProperty({ description: 'ID to link to IMDB' })
  @IsString()
  imdb_id: string;

  @ApiProperty({ description: 'ID to link to TMDB' })
  @IsNumber()
  tmdb_id: number;
}
