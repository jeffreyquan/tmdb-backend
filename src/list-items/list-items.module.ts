import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'lists/entities/list.entity';
import { LoggerModule } from 'logger';
import { Movie } from 'movies/entities/movie.entity';
import { User } from 'users/entities/user.entity';
import { UsersModule } from 'users/users.module';
import { ListItem } from './entities/list-item.entity';
import { ListItemsController } from './list-items.controller';
import { ListItemsService } from './list-items.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([List, ListItem, Movie, User]),
    LoggerModule.forRoot({
      context: 'List Items Service',
    }),
    UsersModule,
  ],
  controllers: [ListItemsController],
  providers: [ListItemsService],
})
export class ListItemsModule {}
