import { Actor } from 'actors/entities/actor.entity';
import { IsString, IsNumber, IsDateString } from 'class-validator';
import { Director } from 'directors/entities/director.entity';
import { Genre } from 'genres/entities/genre.entity';

export class CreateMovieDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly overview: string;

  @IsDateString()
  readonly releaseDate: string;

  @IsNumber()
  readonly duration: number;

  @IsString()
  readonly backdrop: string;

  @IsString()
  readonly poster: string;

  @IsString()
  readonly imdbId: string;

  readonly actors: Actor[];

  readonly director: Director;

  readonly genres: Genre[];
}
