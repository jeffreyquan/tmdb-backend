import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'common/decorators/user.decorator';
import { UserGuard } from 'common/guards/user.guard';
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

  @UseGuards(AuthGuard('jwt'), UserGuard)
  @Get()
  async getAll(@CurrentUser() userId) {
    this.logger.log(
      `fetching movies in list belonging to user with id ${userId}`,
    );

    return await this.listItemsService.getAll({ userId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Request() req, @Param('id') id: string) {
    const userId = req.user.sub;

    this.logger.log(
      `updating watched status of list item belonging to user with id ${userId}`,
    );

    return this.listItemsService.update({
      listItemId: id,
      userId,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    const userId = req.user.sub;

    this.logger.log(
      `removing movie from list belonging to user with id ${userId}`,
    );

    return this.listItemsService.remove({
      listItemId: id,
      userId,
    });
  }
}
