import { INVALID_PAYLOAD_ERROR } from './../constants/errors';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'logger';
import { mapValidationErrors } from 'custom-errors/map-validation-errors';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    const trackingId = request.body?.trackingId ?? request.query?.trackingId;

    const statusCode: number = HttpStatus.BAD_REQUEST;

    const message: string = INVALID_PAYLOAD_ERROR;

    const validationError: string[] =
      exception.response?.message instanceof String
        ? [exception.response?.message]
        : exception.response?.message;

    const errors: Record<string, any>[] = mapValidationErrors(validationError);

    const trace = exception.response?.message;

    const errorResponse = {
      message,
      statusCode,
      errors,
    };

    this.logger.error(message, trace, trackingId);

    response.status(statusCode).json(errorResponse);
  }
}
