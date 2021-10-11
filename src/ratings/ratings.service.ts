import { CreateRatingDto } from './dto/create-rating.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    const rating = this.ratingRepository.create(createRatingDto);

    return this.ratingRepository.save(rating);
  }
}
