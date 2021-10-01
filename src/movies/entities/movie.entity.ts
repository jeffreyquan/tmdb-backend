import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genre } from './genre.entity';
import { Actor } from 'src/actors/entities/actor.entity';
import { Director } from 'src/directors/entities/director.entity';
import { MovieList } from './movie-list.entity';
import { Optional } from '@nestjs/common';

@Entity()
export class Movie {
  @PrimaryColumn()
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
  @Optional()
  backdrop: string;

  @Column()
  poster: string;

  @Column()
  imdb_id: string;

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
