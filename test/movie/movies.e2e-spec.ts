import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MoviesModule } from 'movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

describe('[Feature] Movies - /movies', () => {
  let app: INestApplication;

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
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('Searches and returns results [GET /movies/search?query=${query}]', () => {
    return request(app.getHttpServer())
      .get('/movies/search?query=harry')
      .expect(HttpStatus.OK);
  });
});
