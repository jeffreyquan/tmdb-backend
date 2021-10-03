import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsController } from './actors.controller';
import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { Actor } from './entities/actor.entity';
import tmdbConfig from 'src/config/tmdb.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Actor]),
    HttpModule.registerAsync({
      useFactory: tmdbConfig,
    }),
  ],
  controllers: [ActorsController],
  providers: [ActorsService],
  exports: [ActorsService],
})
export class ActorsModule {}
