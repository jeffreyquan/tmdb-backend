import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'actors/entities/actor.entity';
import { DirectorsService } from 'directors/directors.service';
import { Director } from 'directors/entities/director.entity';
import { GenresService } from 'genres/genres.service';
import { Genre } from 'genres/entities/genre.entity';
import { Movie } from 'movies/entities/movie.entity';
import { MoviesService } from 'movies/movies.service';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { CreateMovieDto } from './create-movie.dto';
import { ActorsService } from 'actors/actors.service';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private actorsService: ActorsService,
    private directorsService: DirectorsService,
    private genresService: GenresService,
    private moviesService: MoviesService,
  ) {}

  async deleteAll() {
    await this.movieRepository.delete({});

    console.log('Deleted all movies');
  }

  async fetchMoviesFromTmdb() {
    for (let i = 2001; i < 4001; i++) {
      try {
        const movie = await this.moviesService.findOrCreateOne(i);

        console.log(`${i}. Added: ${movie.title}`);

        sleep(200);
      } catch (e) {
        console.log(`${i}. Skipping`);
      }
    }
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    const genres = await Promise.all(
      createMovieDto.genres.map(({ id, name }) =>
        this.genresService.findOrCreateGenreByName(id, name),
      ),
    );

    const actors = await Promise.all(
      createMovieDto.actors.map(async (actor) => {
        const existingActor = await this.actorsService.findOne(actor.id);

        if (!existingActor) {
          return await this.actorsService.create(actor);
        }

        return existingActor;
      }),
    );

    let director: Director;

    const existingDirector = await this.directorsService.findOne(
      createMovieDto.director.id,
    );

    if (!existingDirector) {
      director = await this.directorsService.create(createMovieDto.director);
    }

    director = existingDirector;

    const movie = this.movieRepository.create({
      ...createMovieDto,
      genres,
      actors,
      director,
    });

    return this.movieRepository.save(movie);
  }

  async getAllMovies() {
    return await this.movieRepository.find({
      relations: ['actors', 'director', 'genres', 'ratings'],
    });
  }

  async saveMoviesToFile() {
    const movies = await this.getAllMovies();
    fs.writeFile(
      `${process.cwd()}/src/seed/movies.json`,
      JSON.stringify(movies),
      function (err) {
        if (err) throw err;
        console.log('Saved movies to movies.json');
      },
    );
  }
}
