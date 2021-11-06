import {
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchResponseInterceptor } from './interceptors/search-response.interceptor';
import { MoviesService } from './movies.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { Logger } from 'logger';

@ApiTags('movie')
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly logger: Logger,
    private readonly moviesService: MoviesService,
  ) {}

  @UseInterceptors(SearchResponseInterceptor)
  @Get('search')
  search(@Query() searchQueryDto: SearchQueryDto) {
    this.logger.log(`searching for movie with query "${searchQueryDto.query}"`);
    return this.moviesService.search(searchQueryDto);
  }

  @UseInterceptors(SearchResponseInterceptor)
  @Get('popular')
  getPopular() {
    return this.moviesService.fetchPopular();
  }

  @Get(':id')
  async findOne(
    @Headers() { trackingId }: { trackingId: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      this.logger.log(`fetching movie with id ${id}`, trackingId);

      const movie = await this.moviesService.findOrCreateOne(id);

      this.logger.log(
        `fetched movie "${movie.title}" with id ${id}`,
        trackingId,
      );

      return movie;
    } catch (err) {}
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.remove(id);
  }
}
