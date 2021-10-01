import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { Genre } from './entities/genre.entity';
import { List } from 'src/lists/entities/list.entity';

// https://docs.nestjs.com/techniques/http-module
// To use process.env here, we need to use registerAsync
@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Genre, List]),
    HttpModule.registerAsync({
      useFactory: () => ({
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      }),
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
