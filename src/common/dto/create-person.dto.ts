import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export abstract class CreatePersonDto {
  @ApiProperty({ description: 'We use the TMDB ID' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ description: 'Name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Biography' })
  @IsString()
  readonly biography: string;

  @ApiProperty({ description: 'Date of birth' })
  @IsString()
  readonly dateOfBirth: string;

  @ApiProperty({ description: 'Date of death' })
  @IsString()
  readonly dateOfDeath: string;

  @ApiProperty({ description: 'Place of birth' })
  @IsString()
  readonly placeOfBirth: string;

  @ApiProperty({ description: 'Photo' })
  @IsString()
  readonly photo: string;

  @ApiProperty({ description: 'ID to link to IMDB' })
  @IsString()
  readonly imdbId: string;
}
