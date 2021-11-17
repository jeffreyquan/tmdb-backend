import { NestFactory } from '@nestjs/core';
import { SeedModule } from 'seed/seed.module';
import { SeedService } from 'seed/seed.service';
import * as moviesData from 'seed/movies.json';
import { Movie } from 'movies/entities/movie.entity';

async function bootstrap() {
  NestFactory.createApplicationContext(SeedModule)
    .then(async (appContext) => {
      const database = appContext.get(SeedService);

      await database.deleteAll();

      const movies = moviesData as Movie[];

      for (let i = 0; i < movies.length; i++) {
        await database.createMovie(movies[i]);
        console.log(`${i + 1}. Added ${movies[i].title}`);
      }

      // await database.fetchMoviesFromTmdb();

      // await database.saveMoviesToFile();
    })
    .catch((error) => {
      throw error;
    });
}

bootstrap();
