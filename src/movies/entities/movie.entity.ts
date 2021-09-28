import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genre } from './genre.entity';
import { Actor } from 'src/actors/entities/actor.entity';
import { Director } from 'src/directors/entities/director.entity';
import { MovieList } from './movie-list.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  overview: string;

  @Column()
  year: number;

  @Column()
  duration: number;

  @Column()
  backdrop: string;

  @Column()
  poster: string;

  @Column()
  imdb_id: string;

  @Column()
  tmdb_id: number;

  @ManyToOne(() => Director, (director) => director.movies)
  director: Director;

  @ManyToMany(() => Genre, (genre) => genre.movies)
  genres: Genre[];

  @OneToMany(() => MovieList, (movie_list) => movie_list.movie)
  movie_list: MovieList;

  @ManyToMany(() => Actor, (actor) => actor.movies, {
    cascade: true,
  })
  @JoinTable()
  actors: Actor[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
