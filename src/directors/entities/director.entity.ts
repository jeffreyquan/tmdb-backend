import { Entity, OneToMany } from 'typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { Person } from 'src/common/entities/person.entity';

@Entity()
export class Director extends Person {
  @OneToMany(() => Movie, (movie) => movie.director)
  movies: Movie[];
}
