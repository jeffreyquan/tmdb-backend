import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { Repository } from 'typeorm';
import { endpoints } from './config/endpoints';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private httpService: HttpService,
  ) {}

  findAll() {
    return this.movieRepository.find();
  }

  search({
    page = 1,
    query,
  }: SearchQueryDto): Observable<AxiosResponse<any[]>> {
    return this.httpService
      .get(`${endpoints.search}&query=${query}&page=${page}`)
      .pipe(map((response) => response.data));
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne(id);

    if (!movie) {
      throw new NotFoundException(`Movie not found`);
    }

    return movie;
  }

  async create(createMovieDto: CreateMovieDto) {
    const movie = this.movieRepository.create(createMovieDto);

    return this.movieRepository.save(movie);
  }

  async remove(id: number) {
    const movie = await this.findOne(id);
    return this.movieRepository.remove(movie);
  }
}
