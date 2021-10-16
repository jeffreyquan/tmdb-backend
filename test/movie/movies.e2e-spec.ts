import { mockSearchResponse } from './mock-data';
import { SearchQueryDto } from './../../src/movies/dto/search-query.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MoviesModule } from 'movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { MoviesService } from 'movies/movies.service';

describe('[Feature] Movies - /movies', () => {
  let app: INestApplication;
  const moviesService = {
    search: () => JSON.stringify(mockSearchResponse),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MoviesModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () =>
            Object.assign(await getConnectionOptions(), {
              autoLoadEntities: true,
              synchronize: true,
            }),
        }),
      ],
    })
      .overrideProvider(MoviesService)
      .useValue(moviesService)
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('Searches and returns results [GET /movies/search?query=${query}]', () => {
    return request(app.getHttpServer())
      .get('/movies/search')
      .query({
        query: 'harry',
      } as SearchQueryDto)
      .expect(HttpStatus.OK, moviesService.search());
  });

  afterAll(async () => {
    await app.close();
  });
});
