import {
  CustomException,
  DefaultErrorException,
  EntityDoesNotExistException,
  InvalidPayloadException,
  UnauthorizedException,
} from './custom-exceptions';
import { Logger } from 'logger';
import { CustomError, ErrorCode } from 'constants/system-errors';
import { PROVIDER_SOURCE } from 'constants/error-sources';
import { mapSystemErrors } from 'custom-errors/map-system-errors';

const mapMovieProviderErrors = (error): CustomError[] => {
  const providerErrors = error.response?.data.errors || [];

  return providerErrors.map((err): CustomError => {
    return {
      code: ErrorCode.MOVIE_PROVIDER_CODE,
      reason: err?.errorReason?.toLowerCase(),
      details: err?.errorSource,
      source: PROVIDER_SOURCE,
    };
  });
};

type MovieExceptions = {
  400: InvalidPayloadException;
  401: UnauthorizedException;
  404: EntityDoesNotExistException;
  500: DefaultErrorException;
  default: DefaultErrorException;
};

const logger = new Logger({
  context: 'Movie Service',
});

export const customizeError = (
  err: any,
  maskedValue?: string,
  trackingId?: string,
): CustomException => {
  let logMessage;

  if (err instanceof CustomException) {
    logMessage = maskedValue
      ? `${err.error.message} for ${maskedValue}`
      : err.error.message;
    logger.error(logMessage, null, trackingId);
  }

  let trace = err.message;
  let errorResponse: CustomException;

  const errors: CustomError[] = mapMovieProviderErrors(err);

  const exceptions: MovieExceptions = {
    400: new InvalidPayloadException(errors, trackingId, maskedValue),
    401: new UnauthorizedException(errors, trackingId, maskedValue),
    404: new EntityDoesNotExistException(errors, trackingId, maskedValue),
    500: new DefaultErrorException(errors, trackingId, maskedValue),
    default: new DefaultErrorException(
      mapSystemErrors(),
      trackingId,
      maskedValue,
    ),
  };

  if (
    Object.keys(exceptions)
      .map((key) => parseInt(key))
      .includes(err.response?.status)
  ) {
    errorResponse = exceptions[err.response?.status];
    trace = err.response?.data;
  } else {
    errorResponse = exceptions.default;
  }

  logMessage = maskedValue
    ? `${errorResponse.error.message} for ${maskedValue}`
    : errorResponse.error.message;

  if (err.response?.status) logger.debug(logMessage, trackingId, err);

  logger.error(logMessage, trace, trackingId);

  return errorResponse;
};
