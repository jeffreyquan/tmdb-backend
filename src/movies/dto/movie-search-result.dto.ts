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

  @Exclude()
  readonly release_date: string;

  @Exclude()
  readonly video: boolean;

  @Exclude()
  readonly vote_average: number;

  @Exclude()
  readonly vote_count: number;

  readonly title: string;

  @Exclude()
  readonly original_title: string;

  @Expose({ name: 'backdrop_path' })
  readonly backdrop: string;

  @Transform(({ value }) =>
    value ? `https://image.tmdb.org/t/p/w500/${value}` : value,
  )
  @Expose({ name: 'poster_path' })
  readonly poster: string;
}
