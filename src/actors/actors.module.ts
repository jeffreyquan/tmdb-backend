import { ActorsController } from './actors.controller';
import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';

@Module({
  providers: [ActorsService],
  controllers: [ActorsController],
})
export class ActorsModule {}
