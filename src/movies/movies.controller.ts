import {
  Controller,
  Delete,
  Get,
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findOrCreateOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.remove(id);
  }
}
