import { ListsModule } from './../lists/lists.module';
import { DirectorsModule } from './../directors/directors.module';
import { GenresModule } from './../genres/genres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { Genre } from '../genres/entities/genre.entity';
import { List } from 'lists/entities/list.entity';
import tmdbConfig from 'config/tmdb.config';
import { ActorsModule } from 'actors/actors.module';
import { Rating } from 'ratings/entities/rating.entity';
import { RatingsModule } from 'ratings/ratings.module';
import { LoggerModule } from 'logger';
import { PROVIDER_EXCEPTION_FILTERS } from 'filters';

// https://docs.nestjs.com/techniques/http-module
// To use process.env here, we need to use registerAsync
@Module({
  imports: [
    ActorsModule,
    DirectorsModule,
    GenresModule,
    RatingsModule,
    ListsModule,
    TypeOrmModule.forFeature([Genre, List, Movie, Rating]),
    HttpModule.registerAsync({
      useFactory: tmdbConfig,
    }),
    LoggerModule.forRoot({
      context: 'Movie Service',
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, ...PROVIDER_EXCEPTION_FILTERS],
})
export class MoviesModule {}
