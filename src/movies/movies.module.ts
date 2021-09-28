import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { Genre } from './entities/genre.entity';
import { List } from 'src/lists/entities/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre, List])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
