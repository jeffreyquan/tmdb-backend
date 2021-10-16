import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Movie } from 'movies/entities/movie.entity';
import { User } from 'users/entities/user.entity';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { Rating } from './entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Rating, User])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
