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

  @ManyToOne(() => List, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'list_id' })
  list: List;

  @Column({ nullable: true })
  listId: number;

  @ManyToOne(() => Movie, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  /**
   * Show movieId without loading whole movie
   * https://typeorm.io/#/relations-faq/how-to-use-relation-id-without-joining-relation
   *  @Column({ nullable: true })
  movieId: number;
   */

  @Column('boolean', { default: false })
  hasWatched: boolean;
}
