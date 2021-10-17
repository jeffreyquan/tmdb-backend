class Genre {
  readonly id: number;

  readonly name: string;
}

export class MovieDetails {
  readonly backdrop_path: string;

  readonly genres: Genre[];

  readonly id: number;

  readonly imdb_id: string;

  readonly overview: string;

  readonly poster_path: string;

  readonly release_date: string;

  readonly runtime: number;

  readonly title: string;
}
