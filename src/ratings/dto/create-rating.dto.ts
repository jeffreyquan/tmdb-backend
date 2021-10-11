import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({ description: 'User ID' })
  readonly userId: string;

  @ApiProperty({ description: 'Movie ID' })
  readonly movieId: number;

  @ApiProperty({ description: 'Rating of movie out of 10' })
  @IsInt()
  @Min(0)
  @Max(10)
  readonly ratingNumber: number;
}
