export type CustomError = {
  code: ErrorCode;
  reason: string;
  details: string;
  source?: string;
};

export type OverrideSystemErrorValues = Partial<Omit<CustomError, 'code'>>;

/**
 * DEFAULT_CODE is 2000 and every code afterwards is auto-incremented
 * https://www.typescriptlang.org/docs/handbook/enums.html#numeric-enums
 */
export enum ErrorCode {
  DEFAULT_CODE = 2000,
  UNAUTHORIZED_CODE,
  USER_DOES_NOT_EXIST_CODE,
  UPDATE_VALUES_MISSING_CODE,
  ENTITY_ALREADY_EXISTS_CODE,
  ENDPOINT_DOES_NOT_EXIST_CODE,
  INVALID_ENTITY_CODE,
  VALIDATION_ERROR_CODE,

  MOVIE_PROVIDER_CODE = 3000,
}

export const UNAUTHORIZED_REASON = 'unauthorized_access';
export const USER_DOES_NOT_EXIST_REASON = 'user_does_not_exist';
export const UPDATE_VALUES_MISSING_REASON = 'update_values_missing';
export const ENTITY_ALREADY_EXISTS_REASON = 'entity_already_exists';
export const DEFAULT_REASON = 'internal_server_error';
export const ENDPOINT_DOES_NOT_EXIST_REASON = 'endpoint_does_not_exist';
export const INVALID_ENTITY_REASON = 'invalid_field';

export const UNAUTHORIZED_DETAIL = 'Unauthorized access';
export const USER_DOES_NOT_EXIST_DETAIL = 'User does not exist in the system';
export const UPDATE_VALUES_MISSING_DETAIL = 'No update values provided';
export const ENTITY_ALREADY_EXISTS_DETAIL =
  'Duplicate entities cannot be created';
export const DEFAULT_DETAIL = 'Service request failed with status code 500';
export const ENDPOINT_DOES_NOT_EXIST_DETAIL =
  'Service request failed with status code 404';
export const INVALID_ENTITY_DETAIL = 'Field does not exist in entity';
