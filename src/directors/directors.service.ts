import { firstValueFrom } from 'rxjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { CreateDirectorDto } from './dto/create-director.dto';
import { Director } from './entities/director.entity';
import { endpoints } from 'src/config/tmdb-endpoints.config';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
    private httpService: HttpService,
  ) {}

  async findOne(id: number) {
    return await this.directorRepository.findOne(id);
  }

  async fetchDirectorFromTMDB(id: number): Promise<CreateDirectorDto> {
    const response = await firstValueFrom(
      this.httpService.get(`${endpoints.PERSON_DETAILS}/${id}`),
    );

    const {
      id: tmdb_id,
      biography,
      birthday,
      deathday,
      imdb_id,
      name,
      place_of_birth,
      profile_path,
    } = response.data;

    return {
      id: tmdb_id,
      name,
      dateOfBirth: birthday,
      dateOfDeath: deathday,
      placeOfBirth: place_of_birth,
      photo: `https://image.tmdb.org/t/p/w500/${profile_path}`,
      biography,
      imdbId: imdb_id,
    };
  }

  async findOrCreateOne(id: number) {
    const existingDirector = await this.findOne(id);

    if (existingDirector) {
      return existingDirector;
    }

    const director = await this.fetchDirectorFromTMDB(id);

    if (!director) {
      throw new NotFoundException(`Director not found`);
    }

    return await this.create(director);
  }

  async create(createDirectorDto: CreateDirectorDto) {
    const director = this.directorRepository.create(createDirectorDto);

    return this.directorRepository.save(director);
  }
}
