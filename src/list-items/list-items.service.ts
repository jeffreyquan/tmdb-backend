import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'movies/entities/movie.entity';
import { Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { GetAllListItemsDto } from './dto/get-all-list-items.dto';
import { ListItem } from './entities/list-item.entity';

@Injectable()
export class ListItemsService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,
  ) {}

  async create(createListItemDto: CreateListItemDto) {
    const { movieId, userId } = createListItemDto;

    const user = await this.userRepository.findOne(userId, {
      relations: ['list'],
    });

    const movie = await this.movieRepository.findOne(movieId);

    const listItem = this.listItemRepository.create({
      list: user.list,
      movie,
    });

    return this.listItemRepository.save(listItem);
  }

  async getUserList(userId: string) {
    const user = await this.userRepository.findOne(userId, {
      relations: ['list'],
    });

    return user.list;
  }

  async getAll({ userId }: GetAllListItemsDto) {
    const list = await this.getUserList(userId);

    return await this.listItemRepository.find({
      where: {
        list,
      },
      relations: ['movie'],
    });
  }
}
