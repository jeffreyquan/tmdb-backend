import { Exclude, Expose, Transform } from 'class-transformer';

export class MovieSearchResult {
  @Expose({ name: 'id' })
  tmdb_id: number;

  @Exclude()
  adult: boolean;

  @Exclude()
  genre_ids: number[];

  @Exclude()
  original_language: string;

  overview: string;

  @Exclude()
  popularity: number;

  @Exclude()
  release_date: string;

  @Exclude()
  video: boolean;

  @Exclude()
  vote_average: number;

  @Exclude()
  vote_count: number;

  title: string;

  @Exclude()
  original_title: string;

  @Expose({ name: 'backdrop_path' })
  backdrop: string;

  @Transform(({ value }) =>
    value ? `https://image.tmdb.org/t/p/w500/${value}` : value,
  )
  @Expose({ name: 'poster_path' })
  poster: string;
}
