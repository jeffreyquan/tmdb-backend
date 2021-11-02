import { Module } from '@nestjs/common';
import { ListItemsController } from './list-items.controller';
import { ListItemsService } from './list-items.service';

@Module({
  controllers: [ListItemsController],
  providers: [ListItemsService],
})
export class ListItemsModule {}
