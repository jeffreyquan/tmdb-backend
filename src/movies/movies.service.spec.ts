import { MaybeMockedDeep } from 'ts-jest/dist/utils/testing';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GenresService } from 'genres/genres.service';
import { DirectorsService } from 'directors/directors.service';
import { ActorsService } from 'actors/actors.service';
import { mockMovie } from 'mocks/mock-data';
import { of } from 'rxjs';
import { mockMovieDetails } from '../../test/movie/mock-data';
import { endpoints } from './config/endpoints';

describe('MoviesService', () => {
  let service: MoviesService;
  let repo: Repository<Movie>;
  let spyHttpService: MaybeMockedDeep<HttpService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            findOne: jest.fn().mockReturnValue(mockMovie),
          },
        },
        {
          provide: GenresService,
          useValue: {},
        },
        {
          provide: DirectorsService,
          useValue: {},
        },
        {
          provide: ActorsService,
          useValue: {},
        },
        {
          provide: HttpService,
          useFactory: () => ({
            get: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repo = module.get<Repository<Movie>>(getRepositoryToken(Movie));
    spyHttpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a single movie', () => {
      const repoSpy = jest.spyOn(repo, 'findOne');
      expect(service.findOne(123)).resolves.toEqual(mockMovie);
      expect(repoSpy).toBeCalledWith(
        123,
        expect.objectContaining({
          relations: ['actors', 'director', 'genres', 'ratings'],
        }),
      );
    });
  });

  describe('fetchMovieDetails', () => {
    it('should return a promise of the details of a single movie', async () => {
      spyHttpService.get.mockImplementation(() => of(mockMovieDetails));

      const result = await service.fetchMovieDetails(160);

      expect(spyHttpService.get).toHaveBeenCalledTimes(1);

      expect(spyHttpService.get).toHaveBeenCalledWith(`${endpoints.MOVIE}/160`);

      expect(result).toEqual(mockMovieDetails);
    });
  });
});
