import { mockSearchQuery } from './../mocks/movie/mock-data';
import { MaybeMockedDeep } from 'ts-jest/dist/utils/testing';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
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
  mockSearchResponse,
} from 'mocks/movie/mock-data';
import { endpoints } from './config/endpoints';
import { CACHE_MANAGER } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;
  let repo: Repository<Movie>;
  let spyHttpService: MaybeMockedDeep<HttpService>;
  let spyCache: MaybeMockedDeep<Cache>;

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
        {
          provide: CACHE_MANAGER,
          useFactory: () => ({
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repo = module.get<Repository<Movie>>(getRepositoryToken(Movie));
    spyHttpService = module.get(HttpService);
    spyCache = module.get(CACHE_MANAGER);
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
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
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
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      );

      expect(result).toEqual(mockMovieCreditsResponse);
    });
  });

  describe('search', () => {
    afterEach(() => {
      spyHttpService.get.mockClear();
      spyCache.get.mockReset();
    });

    it('should fetch movie search results from cache if present', async () => {
      spyCache.get.mockResolvedValue(JSON.stringify(mockSearchResponse));

      const result = await service.search(mockSearchQuery);
      expect(spyHttpService.get).toHaveBeenCalledTimes(0);
      expect(spyCache.get).toHaveBeenCalledTimes(1);
      expect(spyCache.get).toHaveBeenCalledWith(mockSearchQuery.query);
      expect(result).toEqual(mockSearchResponse);
    });
  });
});
