import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'users/entities/user.entity';
import { MovieList } from 'movies/entities/movie-list.entity';
import { List } from './entities/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List, User, MovieList])],
  providers: [ListsService],
  controllers: [ListsController],
})
export class ListsModule {}
