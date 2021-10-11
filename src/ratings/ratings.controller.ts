import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RatingsService } from './ratings.service';

@ApiTags('rating')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Request() req,
    @Body()
    { movieId, ratingNumber }: { movieId: number; ratingNumber: number },
  ) {
    return await this.ratingsService.create({
      userId: req.user.sub,
      movieId,
      ratingNumber,
    });
  }
}
