import { Movie } from 'src/movies/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Actor {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  dateOfDeath: string;

  @Column({ nullable: true })
  placeOfBirth: string;

  @Column()
  photo: string;

  @Column()
  imdbId: string;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
