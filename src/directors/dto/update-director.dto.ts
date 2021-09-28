import { PartialType } from '@nestjs/swagger';
import { CreateDirectorDto } from './create-director.dto';

export class UpdateActorDto extends PartialType(CreateDirectorDto) {}
