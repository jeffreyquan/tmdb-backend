import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { List } from 'lists/entities/list.entity';
import { Movie } from './movie.entity';

@Entity()
export class MovieList {
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
