import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from 'movies/entities/movie.entity';
import { User } from 'users/entities/user.entity';

// https://typeorm.io/#/relations-faq/how-to-use-relation-id-without-joining-relation
// https://stackoverflow.com/questions/59831159/typeorm-relationship-only-ids-instead-of-whole-instances/59836983#59836983
@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ratings)
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Movie, (movie) => movie.ratings)
  @JoinColumn()
  movie: Movie;

  @Column()
  movieId: number;

  @Column()
  ratingNumber: number;

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
