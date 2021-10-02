import { Type } from 'class-transformer';
import { MovieSearchResult } from './movie-search-result.dto';

export class SearchResult {
  readonly page: number;

  readonly total_pages: number;

  readonly total_results: number;

  @Type(() => MovieSearchResult)
  readonly results: MovieSearchResult[];
}
