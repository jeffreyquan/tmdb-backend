import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllListItemsDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  readonly userId: string;
}
