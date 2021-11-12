import { HttpStatus } from '@nestjs/common';
import {
  DEFAULT_ERROR,
  UNAUTHORIZED_ERROR,
  ENTITY_DOES_NOT_EXIST,
  ENTITY_ALREADY_EXIST,
  INVALID_PAYLOAD_ERROR,
} from 'constants/errors';
import { CustomError } from 'constants/system-errors';

export type GlobalError = {
  errors: CustomError[];
  statusCode: number;
  message: string;
};

export interface ApplicationException {
  error: GlobalError;
  maskedValue?: string;
  trackingId?: string;
}

export class BaseException implements ApplicationException {
  error: GlobalError;
  maskedValue?: string;
  trackingId?: string;

  constructor(error: GlobalError, maskedValue?: string, trackingId?: string) {
    this.error = error;
    this.maskedValue = maskedValue;
    this.trackingId = trackingId;
  }
}

export class CustomException extends BaseException {}

export class UnauthorizedException extends CustomException {
  constructor(
    errors: CustomError[],
    maskedValue?: string,
    trackingId?: string,
  ) {
    const error: GlobalError = {
      message: UNAUTHORIZED_ERROR,
      statusCode: HttpStatus.UNAUTHORIZED,
      errors,
    };

    super(error, maskedValue, trackingId);
  }
}

export class InvalidPayloadException extends CustomException {
  constructor(
    errors: CustomError[],
    maskedValue?: string,
    trackingId?: string,
  ) {
    const error: GlobalError = {
      message: INVALID_PAYLOAD_ERROR,
      statusCode: HttpStatus.BAD_REQUEST,
      errors,
    };

    super(error, maskedValue, trackingId);
  }
}

export class DefaultErrorException extends CustomException {
  constructor(
    errors: CustomError[],
    maskedValue?: string,
    trackingId?: string,
  ) {
    const error: GlobalError = {
      message: DEFAULT_ERROR,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errors,
    };

    super(error, maskedValue, trackingId);
  }
}

export class EntityDoesNotExistException extends CustomException {
  constructor(
    errors: CustomError[],
    maskedValue?: string,
    trackingId?: string,
  ) {
    const error: GlobalError = {
      message: ENTITY_DOES_NOT_EXIST,
      statusCode: HttpStatus.NOT_FOUND,
      errors,
    };

    super(error, maskedValue, trackingId);
  }
}

export class AlreadyExistException extends CustomException {
  constructor(
    errors: CustomError[],
    maskedValue?: string,
    trackingId?: string,
  ) {
    const error: GlobalError = {
      message: ENTITY_ALREADY_EXIST,
      statusCode: HttpStatus.CONFLICT,
      errors,
    };

    super(error, maskedValue, trackingId);
  }
}
