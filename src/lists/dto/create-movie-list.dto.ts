import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListItem {
  @ApiProperty({ description: 'ID of movie. We use the TMDB ID' })
  @IsNumber()
  readonly movieId: number;
}
