import { Inject, Injectable, LoggerService } from '@nestjs/common';
import pino from 'pino';
import { LoggerInitOpts } from './types';

@Injectable()
export class Logger implements LoggerService {
  private readonly logger: pino.Logger;
  private readonly context: string;

  static readonly initOpts = {
    formatters: {
      level: (label: string): { level: string } => ({ level: label }),
    },
    timestamp: (): string => {
      const now = new Date().toISOString();
      return `,"timestamp":"${now}"`;
    },
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
  };

  constructor(@Inject('OPTIONS') private options: LoggerInitOpts) {
    const { initOpts } = Logger;
    const { context, ...pinoOptions } = options;

    this.context = context;
    this.logger = pino(
      {
        ...initOpts,
        ...pinoOptions,
      },
      pino.transport({
        target: 'pino-pretty',
        options: { colorize: true },
      }),
    );
  }

  debug(message: any, trackingId?: string, errorObject?: any): void {
    this.logger.debug({
      message,
      errorObject,
      trackingId,
      context: this.context,
    });
  }

  log(message: any, trackingId?: string): void {
    this.logger.info({
      message,
      trackingId,
      context: this.context,
    });
  }

  warn(message: any, trackingId?: string): void {
    this.logger.warn({
      message,
      trackingId,
      context: this.context,
    });
  }

  error(
    message: any,
    trace?: string | Error,
    trackingId?: string,
    context?: any,
  ): void {
    this.logger.error({
      message,
      trace,
      trackingId,
      context: context || this.context,
    });
  }
}
