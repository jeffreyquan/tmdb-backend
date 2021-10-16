import { Entity, OneToMany } from 'typeorm';
import { Movie } from 'movies/entities/movie.entity';
import { Person } from 'common/entities/person.entity';

@Entity()
export class Director extends Person {
  @OneToMany(() => Movie, (movie) => movie.director)
  movies: Movie[];
}
