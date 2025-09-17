import type { ErrorResponse } from '@alwatr/nanotron';
import type { Json } from '@alwatr/type-helper';

/**
 * Represents an error response from a service, following the standard error format.
 */
export type ErrorServiceResponse = ErrorResponse;

/**
 * Represents a successful service response containing data.
 * @typeParam TData - The type of data contained in the response, must extend Json.
 */
export type SuccessServiceResponse<TData extends Json> = {
  ok: true;
  data: TData;
};

/**
 * Represents a service response that can be either successful or an error.
 * @typeParam TData - The type of data in case of success, must extend Json.
 */
export type ServiceResponse<TData extends Json> = SuccessServiceResponse<TData> | ErrorResponse;

/**
 * Result type for Nitrobase fetch operations, implementing the safe result pattern.
 * This architecture ensures type-safe error handling without exceptions.
 * @typeParam TData - The expected data type from the database, must be a JsonObject.
 */
export type NitrobaseFetchResult<TData extends JsonObject> =
  | {
    type: 'network_error';
    error: unknown;
  } |
  {
    type: 'unexpected_error';
    rawResponse: Response;
    error?: unknown;
  } |
  {
    type: 'nitrobase_error';
    response: ErrorServiceResponse;
    rawResponse: Response;
  } |
  {
    type: 'success';
    db: TData;
    rawResponse: Response;
  };

/**
 * Result type for Nanotron fetch operations, implementing the safe result pattern.
 * This architecture ensures type-safe error handling without exceptions.
 * @typeParam TData - The expected data type from the API, must extend Json.
 */
export type NanotronFetchResult<TData extends Json> =
  | {
    type: 'network_error';
    error: unknown;
  } |
  {
    type: 'unexpected_error';
    rawResponse: Response;
    error?: unknown;
  } |
  {
    type: 'nanotron_error';
    response: ErrorServiceResponse;
    rawResponse: Response;
  } |
  {
    type: 'success';
    response: SuccessServiceResponse<TData>;
    rawResponse: Response;
  };
