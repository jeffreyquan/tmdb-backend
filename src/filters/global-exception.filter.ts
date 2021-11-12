import { DEFAULT_ERROR } from './../constants/errors';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'logger';
import { mapSystemErrors } from 'custom-errors/map-system-errors';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    const trackingId = request.body?.trackingId ?? request.query?.trackingId;

    const statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;

    const message: string = DEFAULT_ERROR;

    const errors: Record<string, any>[] = mapSystemErrors();

    const trace = exception.message;

    const errorResponse = {
      message,
      statusCode,
      errors,
    };

    this.logger.error(message, trace, trackingId);

    if (response.status) {
      response.status(statusCode).json(errorResponse);
    }

    return exception;
  }
}
