import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DirectorsController } from './directors.controller';
import { DirectorsService } from './directors.service';
import { Director } from './entities/director.entity';
import tmdbConfig from 'config/tmdb.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Director]),
    HttpModule.registerAsync({
      useFactory: tmdbConfig,
    }),
  ],
  controllers: [DirectorsController],
  providers: [DirectorsService],
  exports: [DirectorsService],
})
export class DirectorsModule {}
