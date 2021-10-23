import { IsOptional, IsPositive, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  readonly query: string;

  @IsPositive()
  @IsOptional()
  readonly page?: number;
}
