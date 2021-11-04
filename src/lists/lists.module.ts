import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'users/entities/user.entity';
import { ListItem } from 'list-items/entities/list-item.entity';
import { List } from './entities/list.entity';
@Module({
  imports: [TypeOrmModule.forFeature([List, User, ListItem])],
  providers: [ListsService],
  controllers: [ListsController],
})
export class ListsModule {}
