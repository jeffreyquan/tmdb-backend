import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ActorsModule } from './actors/actors.module';
import { DirectorsModule } from './directors/directors.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { GenresModule } from './genres/genres.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RatingsModule } from './ratings/ratings.module';
import { LoggerModule } from './logger/logger.module';
import { ListItemsModule } from './list-items/list-items.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          synchronize: true,
        }),
    }),
    MoviesModule,
    ActorsModule,
    DirectorsModule,
    AuthModule,
    UsersModule,
    ListsModule,
    GenresModule,
    ReviewsModule,
    RatingsModule,
    LoggerModule,
    ListItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
