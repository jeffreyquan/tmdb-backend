import { MovieList } from 'src/movies/entities/movie-list.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.list)
  @JoinColumn({ name: 'owner' })
  user: User;

  @Column('boolean', { default: false })
  is_public: boolean;

  @OneToMany(() => MovieList, (movie_list) => movie_list.list)
  movie_list: MovieList;

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
