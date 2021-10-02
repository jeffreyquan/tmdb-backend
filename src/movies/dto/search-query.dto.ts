import { IsOptional, IsPositive, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  readonly query: string;

  @IsOptional()
  @IsPositive()
  readonly page: number;
}
