import { SearchResponseInterceptor } from './interceptors/search-response.interceptor';
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
import { MoviesService } from './movies.service';
import { SearchQueryDto } from './dto/search-query.dto';

@ApiTags('movie')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseInterceptors(SearchResponseInterceptor)
  @Get('search')
  search(@Query() searchQueryDto: SearchQueryDto) {
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
