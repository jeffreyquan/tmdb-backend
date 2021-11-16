import { NestFactory } from '@nestjs/core';
import { SeedModule } from 'seed/seed.module';
import { SeedService } from 'seed/seed.service';

async function bootstrap() {
  NestFactory.createApplicationContext(SeedModule)
    .then(async (appContext) => {
      const database = appContext.get(SeedService);

      // await database.deleteAll();

      // await database.fetchMoviesFromTmdb();

      await database.saveMoviesToFile();
    })
    .catch((error) => {
      throw error;
    });
}

bootstrap();
