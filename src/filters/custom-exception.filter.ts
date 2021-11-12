import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { CustomException } from 'custom-errors/custom-exceptions';
import { Response } from 'express';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    response.status(exception.error.statusCode).json(exception.error);
  }
}
