import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'logger';
import { mapSystemErrors } from 'custom-errors/map-system-errors';
import { UNAUTHORIZED_ERROR } from 'constants/errors';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    const trackingId = request.body?.trackingId ?? request.query?.trackingId;

    const statusCode: number = HttpStatus.UNAUTHORIZED;

    const message: string = UNAUTHORIZED_ERROR;

    const error = exception.error ?? exception;

    const errors = mapSystemErrors(error);

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
