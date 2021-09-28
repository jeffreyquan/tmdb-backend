import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from 'src/movies/entities/movie.entity';

@Entity()
export class Director {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  date_of_birth: string;

  @Column({ nullable: true })
  date_of_death: string;

  @Column({ nullable: true })
  place_of_birth: string;

  @Column()
  photo: string;

  @Column()
  imdb_id: string;

  @Column()
  tmdb_id: number;

  @OneToMany(() => Movie, (movie) => movie.director)
  movies: Movie[];

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
