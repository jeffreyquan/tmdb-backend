import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ActorsModule } from './actors/actors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { DirectorsModule } from './directors/directors.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { GenresModule } from './genres/genres.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RatingsModule } from './ratings/ratings.module';

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
    LoggerModule.forRoot({
      pinoHttp: [
        {
          formatters: {
            level: (label: string): { level: string } => ({
              level: label,
            }),
          },
          timestamp: (): string => {
            const now = new Date().toISOString();
            return `,"timestamp":"${now}"`;
          },
          level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
          prettyPrint: process.env.NODE_ENV !== 'production',
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
