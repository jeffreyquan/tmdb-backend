import { DirectorsModule } from './../directors/directors.module';
import { GenresModule } from './../genres/genres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { Genre } from '../genres/entities/genre.entity';
import { List } from 'src/lists/entities/list.entity';
import tmdbConfig from 'src/config/tmdb.config';
import { ActorsModule } from 'src/actors/actors.module';
import { Rating } from 'src/ratings/entities/rating.entity';
import { RatingsModule } from 'src/ratings/ratings.module';

// https://docs.nestjs.com/techniques/http-module
// To use process.env here, we need to use registerAsync
@Module({
  imports: [
    ActorsModule,
    DirectorsModule,
    GenresModule,
    RatingsModule,
    TypeOrmModule.forFeature([Genre, List, Movie, Rating]),
    HttpModule.registerAsync({
      useFactory: tmdbConfig,
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
