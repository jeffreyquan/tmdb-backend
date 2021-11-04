import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { List } from 'lists/entities/list.entity';
import { Movie } from 'movies/entities/movie.entity';

@Unique(['list', 'movie'])
@Entity()
export class ListItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => List)
  @JoinColumn({ name: 'list_id' })
  list: List;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Column('boolean', { default: false })
  hasWatched: boolean;
}
