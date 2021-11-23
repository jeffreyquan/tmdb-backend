import { HttpModule } from '@nestjs/axios';
import { ListsModule } from './../lists/lists.module';
import { DirectorsModule } from './../directors/directors.module';
import { GenresModule } from './../genres/genres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { Genre } from '../genres/entities/genre.entity';
import { List } from 'lists/entities/list.entity';
import { ActorsModule } from 'actors/actors.module';
import { Rating } from 'ratings/entities/rating.entity';
import { RatingsModule } from 'ratings/ratings.module';
import { LoggerModule } from 'logger';
import { PROVIDER_EXCEPTION_FILTERS } from 'filters';

@Module({
  imports: [
    ActorsModule,
    DirectorsModule,
    GenresModule,
    RatingsModule,
    ListsModule,
    TypeOrmModule.forFeature([Genre, List, Movie, Rating]),
    LoggerModule.forRoot({
      context: 'Movie Service',
    }),
    HttpModule,
    CacheModule.register({
      ttl: parseInt(process.env.CACHE_TIME_TO_LIVE),
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, ...PROVIDER_EXCEPTION_FILTERS],
  exports: [MoviesService],
})
export class MoviesModule {}
