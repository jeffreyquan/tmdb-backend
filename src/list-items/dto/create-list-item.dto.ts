import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListItemDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: 'ID of movie. We use the TMDB ID' })
  @IsNumber()
  readonly movieId: number;
}
