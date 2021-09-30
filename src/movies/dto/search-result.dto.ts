import { Type } from 'class-transformer';
import { MovieSearchResult } from './movie-search-result.dto';

export class SearchResult {
  page: number;

  total_pages: number;

  total_results: number;

  @Type(() => MovieSearchResult)
  results: MovieSearchResult[];
}
