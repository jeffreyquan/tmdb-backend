import {
  mockSearchResponse,
  mockSearchQuery,
  mockMovieId,
  mockMovie,
} from 'mocks/movie/mock-data';
import { MaybeMockedDeep } from 'ts-jest/dist/utils/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MaybeMockedDeep<MoviesService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MoviesService,
          useFactory: () => ({
            search: jest.fn(() => mockSearchResponse),
            findOrCreateOne: jest.fn(() => mockMovie),
          }),
        },
      ],
      controllers: [MoviesController],
    }).compile();

    controller = module.get(MoviesController);
    service = module.get(MoviesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('the search function', () => {
    afterEach(() => {
      service.search.mockClear();
    });

    it('should return search results containing movies', async () => {
      await controller.search(mockSearchQuery);

      expect(service.search).toHaveBeenCalledTimes(1);

      expect(service.search).toHaveBeenCalledWith(mockSearchQuery);
    });
  });

  describe('the find one function', () => {
    afterEach(() => {
      service.search.mockClear();
    });

    it('should return movie details', async () => {
      await controller.findOne(mockMovieId);

      expect(service.findOrCreateOne).toHaveBeenCalledTimes(1);

      expect(service.findOrCreateOne).toHaveBeenCalledWith(mockMovieId);
    });
  });
});
