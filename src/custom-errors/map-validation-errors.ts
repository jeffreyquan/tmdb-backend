import { VALIDATION_SOURCE } from 'constants/error-sources';
import { CustomError, ErrorCode } from 'constants/system-errors';

export const mapValidationErrors = (errors: string[]): CustomError[] =>
  errors.map((error): CustomError => {
    const errorProp = error.split(' ')[0];
    const formattedErrorProp = errorProp.split('.').join('_');

    return {
      reason: `invalid_${formattedErrorProp}`,
      source: VALIDATION_SOURCE,
      details: error,
      code: ErrorCode.VALIDATION_ERROR_CODE,
    };
  });
