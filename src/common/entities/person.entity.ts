import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Person {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  biography: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  dateOfDeath: string;

  @Column({ nullable: true })
  placeOfBirth: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  imdbId: string;

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
