import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async findOne(id: number) {
    return await this.genreRepository.findOne(id);
  }

  async findOrCreateGenreByName(name: string): Promise<Genre> {
    const existingGenre = await this.genreRepository.findOne({ name });

    if (existingGenre) {
      return existingGenre;
    }

    return await this.create({
      name,
    });
  }

  async create(createGenreDto: CreateGenreDto) {
    const genre = this.genreRepository.create(createGenreDto);

    return this.genreRepository.save(genre);
  }
}
