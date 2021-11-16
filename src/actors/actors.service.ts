import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { endpoints } from 'config/tmdb-endpoints.config';
import { Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';
import { Actor } from './entities/actor.entity';
import { tmdbApiHeaders } from 'config/tmdb.config';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    private httpService: HttpService,
  ) {}

  async findOne(id: number) {
    return await this.actorRepository.findOne(id);
  }

  async fetchActorFromTMDB(id: number): Promise<CreateActorDto> {
    const response = await firstValueFrom(
      this.httpService.get(`${endpoints.PERSON_DETAILS}/${id}`, tmdbApiHeaders),
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
      photo: profile_path
        ? `https://image.tmdb.org/t/p/w500/${profile_path}`
        : null,
      biography,
      imdbId: imdb_id,
    };
  }

  async findOrCreateOne(id: number) {
    const existingActor = await this.findOne(id);

    if (existingActor) {
      return existingActor;
    }

    const actor = await this.fetchActorFromTMDB(id);

    if (!actor) {
      throw new NotFoundException(`Actor not found`);
    }

    return await this.create(actor);
  }

  async create(createActorDto: CreateActorDto) {
    const actor = this.actorRepository.create(createActorDto);

    return this.actorRepository.save(actor);
  }
}
