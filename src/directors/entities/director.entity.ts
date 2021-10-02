import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from 'src/movies/entities/movie.entity';

@Entity()
export class Director {
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

  @OneToMany(() => Movie, (movie) => movie.director)
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
