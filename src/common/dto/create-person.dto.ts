import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export abstract class CreatePersonDto {
  @ApiProperty({ description: 'We use the TMDB ID' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Biography' })
  @IsString()
  biography: string;

  @ApiProperty({ description: 'Date of birth' })
  @IsString()
  dateOfBirth: string;

  @ApiProperty({ description: 'Date of death' })
  @IsString()
  dateOfDeath: string;

  @ApiProperty({ description: 'Place of birth' })
  @IsString()
  placeOfBirth: string;

  @ApiProperty({ description: 'Photo' })
  @IsString()
  photo: string;

  @ApiProperty({ description: 'ID to link to IMDB' })
  @IsString()
  imdbId: string;
}
