import { APP_FILTER } from '@nestjs/core';
import { BadRequestExceptionFilter } from './bad-request-exception.filter';
import { CustomExceptionFilter } from './custom-exception.filter';
import { GlobalExceptionFilter } from './global-exception.filter';
import { NotFoundExceptionFilter } from './not-found-exception.filter';
import { UnauthorizedExceptionFilter } from './unauthorized-exception.filter';

export const PROVIDER_EXCEPTION_FILTERS = [
  {
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: CustomExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: BadRequestExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: NotFoundExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: UnauthorizedExceptionFilter,
  },
];
