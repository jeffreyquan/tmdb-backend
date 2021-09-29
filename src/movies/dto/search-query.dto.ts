import { IsOptional, IsPositive, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  query: string;

  @IsOptional()
  @IsPositive()
  page: number;
}
