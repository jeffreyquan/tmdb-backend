import { Entity, ManyToMany } from 'typeorm';
import { Person } from 'src/common/entities/person.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@Entity()
export class Actor extends Person {
  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[];
}
