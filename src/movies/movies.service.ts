import { DirectorsService } from './../directors/directors.service';
import { firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { endpoints } from './config/endpoints';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { SearchQueryDto } from './dto/search-query.dto';
import { GenresService } from 'genres/genres.service';
import { ActorsService } from 'actors/actors.service';
import { MovieDetails } from './dto/movie-details';
import { MovieCredits } from './dto/movie-credits';
import { tmdbApiHeaders } from 'config/tmdb.config';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private genresService: GenresService,
    private directorsService: DirectorsService,
    private actorsService: ActorsService,
    private httpService: HttpService,
  ) {}

  findAll() {
    return this.movieRepository.find();
  }

  async search({ page = 1, query }: SearchQueryDto): Promise<any> {
    let results;

    results = await this.cacheManager.get(query);

    if (results) {
      return JSON.parse(results as string);
    }

    results = await firstValueFrom(
      this.httpService.get(
        `${endpoints.SEARCH}?query=${query}&page=${page}`,
        tmdbApiHeaders,
      ),
    );

    await this.cacheManager.set(query, JSON.stringify(results.data));

    return results.data;
  }

  fetchPopular(): Observable<AxiosResponse<any[]>> {
    return this.httpService
      .get(`${endpoints.POPULAR}`)
      .pipe(map((response) => response.data));
  }

  async fetchMovieDetails(id: number): Promise<AxiosResponse<MovieDetails>> {
    return firstValueFrom(
      this.httpService.get(`${endpoints.MOVIE}/${id}`, tmdbApiHeaders),
    );
  }

  async fetchMovieCredits(id: number): Promise<AxiosResponse<MovieCredits>> {
    return firstValueFrom(
      this.httpService.get(`${endpoints.MOVIE}/${id}/credits`, tmdbApiHeaders),
    );
  }

  async fetchMovieFromTmdb(id: number): Promise<CreateMovieDto> {
    const [movieDetails, credits] = await Promise.all([
      this.fetchMovieDetails(id),
      this.fetchMovieCredits(id),
    ]);

    const {
      backdrop_path,
      genres,
      id: tmbd_id,
      imdb_id,
      overview,
      poster_path,
      release_date,
      runtime,
      title,
    } = movieDetails.data;

    const director = credits.data.crew.find(
      (person) => person.job === 'Director',
    );

    const actorIds = credits.data.cast.map((actor) => actor.id);

    return {
      id: tmbd_id,
      title,
      overview,
      duration: runtime,
      backdrop: backdrop_path
        ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
        : null,
      poster: poster_path
        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
        : null,
      imdbId: imdb_id,
      genres,
      releaseDate: release_date,
      directorId: director.id,
      actorIds,
    };
  }

  async findOne(id: number) {
    return await this.movieRepository.findOne(id, {
      relations: ['actors', 'director', 'genres', 'ratings'],
    });
  }

  async findOrCreateOne(id: number) {
    const existingMovie = await this.findOne(id);

    if (existingMovie) {
      return existingMovie;
    }

    const movie = await this.fetchMovieFromTmdb(id);

    if (!movie) {
      throw new NotFoundException(`Movie not found`);
    }

    await this.create(movie);

    // this allows relations to be populated instead of returning the result of create above
    return await this.findOne(movie.id);
  }

  async create(createMovieDto: CreateMovieDto) {
    const genres = await Promise.all(
      createMovieDto.genres.map(({ id, name }) =>
        this.genresService.findOrCreateGenreByName(id, name),
      ),
    );

    const director = await this.directorsService.findOrCreateOne(
      createMovieDto.directorId,
    );

    const actors = await Promise.all(
      createMovieDto.actorIds
        .slice(0, 10)
        .map((actorId) => this.actorsService.findOrCreateOne(actorId)),
    );

    const movie = this.movieRepository.create({
      ...createMovieDto,
      genres,
      director,
      actors,
    });

    return this.movieRepository.save(movie);
  }

  async remove(id: number) {
    const movie = await this.findOne(id);
    return this.movieRepository.remove(movie);
  }
}
