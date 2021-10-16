import { Entity, ManyToMany } from 'typeorm';
import { Person } from 'common/entities/person.entity';
import { Movie } from 'movies/entities/movie.entity';

@Entity()
export class Actor extends Person {
  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[];
}
