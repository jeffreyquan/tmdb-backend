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
import { Rating } from './../../ratings/entities/rating.entity';
import { Genre } from '../../genres/entities/genre.entity';
import { Actor } from 'actors/entities/actor.entity';
import { Director } from 'directors/entities/director.entity';
import { ListItem } from '../../list-items/entities/list-item.entity';
import { Optional } from '@nestjs/common';

@Entity()
export class Movie {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  overview: string;

  @Column({ nullable: true })
  releaseDate: string;

  @Column()
  duration: number;

  @Column()
  @Optional()
  backdrop: string;

  @Column()
  poster: string;

  @Column()
  imdbId: string;

  @ManyToOne(() => Director, (director) => director.movies, { cascade: true })
  director: Director;

  @ManyToMany(() => Genre, (genre) => genre.movies, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  genres: Genre[];

  @OneToMany(() => Rating, (rating) => rating.movie, { onDelete: 'CASCADE' })
  ratings: Rating[];

  @OneToMany(() => ListItem, (listItem) => listItem.movie, {
    onDelete: 'CASCADE',
  })
  listItem: ListItem;

  @ManyToMany(() => Actor, (actor) => actor.movies, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  actors: Actor[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    select: false,
  })
  updatedAt: Date;
}
