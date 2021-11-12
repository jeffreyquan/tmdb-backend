import { Exclude, Expose, Transform } from 'class-transformer';

export class MovieSearchResult {
  readonly id: number;

  @Exclude()
  readonly adult: boolean;

  @Exclude()
  readonly genre_ids: number[];

  @Exclude()
  readonly original_language: string;

  readonly overview: string;

  @Exclude()
  readonly popularity: number;

  @Expose({ name: 'release_date' })
  readonly releaseDate: string;

  @Exclude()
  readonly video: boolean;

  @Exclude()
  readonly vote_average: number;

  @Exclude()
  readonly vote_count: number;

  readonly title: string;

  @Exclude()
  readonly original_title: string;

  @Transform(({ value }) =>
    value
      ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${value}`
      : value,
  )
  @Expose({ name: 'backdrop_path' })
  readonly backdrop: string;

  @Transform(({ value }) =>
    value ? `https://image.tmdb.org/t/p/w500/${value}` : value,
  )
  @Expose({ name: 'poster_path' })
  readonly poster: string;
}
