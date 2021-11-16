import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'actors/entities/actor.entity';
import { Director } from 'directors/entities/director.entity';
import { Genre } from 'genres/entities/genre.entity';
import { Movie } from 'movies/entities/movie.entity';
import { MoviesService } from 'movies/movies.service';
import { Repository } from 'typeorm';
import * as fs from 'fs';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    private moviesService: MoviesService,
  ) {}

  async deleteAll() {
    await this.movieRepository.delete({});

    console.log('Deleted all movies');
  }

  async fetchMoviesFromTmdb() {
    for (let i = 1; i < 2001; i++) {
      try {
        const movie = await this.moviesService.findOrCreateOne(i);

        console.log(`${i}. Added: ${movie.title}`);

        sleep(200);
      } catch (e) {
        console.log(`${i}. Skipping`);
      }
    }
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
