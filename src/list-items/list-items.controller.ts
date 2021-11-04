import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Logger } from 'logger';
import { ListItemsService } from './list-items.service';

@ApiTags('list-item')
@Controller('list-items')
export class ListItemsController {
  constructor(
    private readonly logger: Logger,
    private readonly listItemsService: ListItemsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  add(@Request() req, @Body() { movieId }: { movieId: number }) {
    const userId = req.user.sub;

    this.logger.log(
      `adding movie with id ${movieId} to the list belonging to user with id ${userId}`,
    );

    return this.listItemsService.create({
      userId,
      movieId,
    });
  }
}
