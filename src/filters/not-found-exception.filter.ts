import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'logger';
import { mapSystemErrors } from 'custom-errors/map-system-errors';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    const trackingId = request.body?.trackingId ?? request.query?.trackingId;

    const statusCode: number = HttpStatus.NOT_FOUND;

    const message: string = exception.message;

    const errors: Record<string, any>[] = mapSystemErrors(exception);

    const trace = exception.message;

    const errorResponse = {
      message,
      statusCode,
      errors,
    };

    this.logger.error(message, trace, trackingId);

    response.status(statusCode).json(errorResponse);
  }
}
