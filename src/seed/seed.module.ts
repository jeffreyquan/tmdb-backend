import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from 'actors/entities/actor.entity';
import { Director } from 'directors/entities/director.entity';
import { Genre } from 'genres/entities/genre.entity';
import { ListItem } from 'list-items/entities/list-item.entity';
import { List } from 'lists/entities/list.entity';
import { Movie } from 'movies/entities/movie.entity';
import { MoviesModule } from 'movies/movies.module';
import { Rating } from 'ratings/entities/rating.entity';
import { getConnectionOptions } from 'typeorm';
import { User } from 'users/entities/user.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forFeature([
      Actor,
      Director,
      Genre,
      List,
      ListItem,
      Movie,
      Rating,
      User,
    ]),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          synchronize: true,
        }),
    }),
  ],
  providers: [SeedService],
})
export class SeedModule {}
