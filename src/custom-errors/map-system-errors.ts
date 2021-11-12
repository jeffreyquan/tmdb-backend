import { SYSTEM_SOURCE } from 'constants/error-sources';
import { UNAUTHORIZED_ERROR } from 'constants/errors';
import { EntityColumnNotFound, UpdateValuesMissingError } from 'typeorm';
import {
  DEFAULT_DETAIL,
  ENDPOINT_DOES_NOT_EXIST_DETAIL,
  ENDPOINT_DOES_NOT_EXIST_REASON,
  ENTITY_ALREADY_EXISTS_DETAIL,
  ENTITY_ALREADY_EXISTS_REASON,
  ErrorCode,
  CustomError,
  UNAUTHORIZED_DETAIL,
  UNAUTHORIZED_REASON,
  UPDATE_VALUES_MISSING_DETAIL,
  UPDATE_VALUES_MISSING_REASON,
} from 'constants/system-errors';
import { DEFAULT_REASON } from 'constants/system-error-reasons';

export const mapSystemErrors = (error?): CustomError[] => {
  let reason = '';
  let details = '';

  let errorResponse: CustomError = {
    reason: DEFAULT_REASON,
    details: DEFAULT_DETAIL,
    code: ErrorCode.DEFAULT_CODE,
    source: SYSTEM_SOURCE,
  };

  if (error?.message === UNAUTHORIZED_ERROR) {
    errorResponse = unauthorizedError();
  } else if (error?.status === 404) {
    errorResponse = endPointDoesNotExistError();
  } else if (error?.name === EntityColumnNotFound.name) {
    const field = error.message.split(' ')[3].split('"')[1];
    reason = `invalid_field_${field}`;
    details = `${field} field does not exist in entity`;
    errorResponse = invalidEntityError(reason, details);
  } else if (error?.name === UpdateValuesMissingError.name) {
    errorResponse = entityUpdateValuesMissingError();
  } else if (error?.code === '23505') {
    errorResponse = entityAlreadyExistsError();
  }

  return [errorResponse];
};

const unauthorizedError = (): CustomError => {
  return {
    source: SYSTEM_SOURCE,
    code: ErrorCode.UNAUTHORIZED_CODE,
    reason: UNAUTHORIZED_REASON,
    details: UNAUTHORIZED_DETAIL,
  };
};

const endPointDoesNotExistError = (): CustomError => {
  return {
    source: SYSTEM_SOURCE,
    code: ErrorCode.ENDPOINT_DOES_NOT_EXIST_CODE,
    reason: ENDPOINT_DOES_NOT_EXIST_REASON,
    details: ENDPOINT_DOES_NOT_EXIST_DETAIL,
  };
};

const invalidEntityError = (reason, details): CustomError => {
  return {
    source: SYSTEM_SOURCE,
    code: ErrorCode.INVALID_ENTITY_CODE,
    reason,
    details,
  };
};

const entityUpdateValuesMissingError = (): CustomError => {
  return {
    source: SYSTEM_SOURCE,
    code: ErrorCode.UPDATE_VALUES_MISSING_CODE,
    reason: UPDATE_VALUES_MISSING_REASON,
    details: UPDATE_VALUES_MISSING_DETAIL,
  };
};

const entityAlreadyExistsError = (): CustomError => {
  return {
    source: SYSTEM_SOURCE,
    code: ErrorCode.ENTITY_ALREADY_EXISTS_CODE,
    reason: ENTITY_ALREADY_EXISTS_REASON,
    details: ENTITY_ALREADY_EXISTS_DETAIL,
  };
};
