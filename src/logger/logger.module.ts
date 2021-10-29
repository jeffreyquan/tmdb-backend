import { DynamicModule, Module } from '@nestjs/common';
import { Logger } from './logger.service';
import { LoggerInitOpts } from './types';

@Module({})
export class LoggerModule {
  static forRoot(options: LoggerInitOpts): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: 'OPTIONS',
          useValue: options,
        },
        Logger,
      ],
      exports: [Logger],
    };
  }
}
