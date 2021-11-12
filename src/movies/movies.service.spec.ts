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
import { of } from 'rxjs';
import {
  mockMovie,
  mockMovieCreditsResponse,
  mockMovieDetailsResponse,
  mockMovieId,
} from 'mocks/movie/mock-data';
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
      expect(service.findOne(mockMovieId)).resolves.toEqual(mockMovie);
      expect(repoSpy).toBeCalledWith(
        mockMovieId,
        expect.objectContaining({
          relations: ['actors', 'director', 'genres', 'ratings'],
        }),
      );
    });
  });

  describe('fetchMovieDetails', () => {
    it('should return a promise of the details of a single movie', async () => {
      spyHttpService.get.mockImplementation(() => of(mockMovieDetailsResponse));

      const result = await service.fetchMovieDetails(mockMovieId);

      expect(spyHttpService.get).toHaveBeenCalledTimes(1);

      expect(spyHttpService.get).toHaveBeenCalledWith(
        `${endpoints.MOVIE}/${mockMovieId}`,
      );

      expect(result).toEqual(mockMovieDetailsResponse);
    });
  });

  describe('fetchMovieCredits', () => {
    it('should return a promise of the credits of a single movie', async () => {
      spyHttpService.get.mockImplementation(() => of(mockMovieCreditsResponse));

      const result = await service.fetchMovieCredits(mockMovieId);

      expect(spyHttpService.get).toHaveBeenCalledTimes(1);

      expect(spyHttpService.get).toHaveBeenCalledWith(
        `${endpoints.MOVIE}/${mockMovieId}/credits`,
      );

      expect(result).toEqual(mockMovieCreditsResponse);
    });
  });
});
