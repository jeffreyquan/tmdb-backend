import pino from 'pino';

export type LoggerInitOpts = pino.LoggerOptions & {
  context: string;
  destination?: pino.DestinationStream;
};
