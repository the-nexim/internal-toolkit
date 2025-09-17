import { fetch, type FetchOptions } from '@alwatr/fetch';

import type { ErrorServiceResponse, SuccessServiceResponse, ServiceResponse } from './lib/service-response.js';
import type { Json } from '@alwatr/type-helper';

// Define Result types for the safe result pattern
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

/**
 * Fetches data from Nanotron API and returns a result based on the response.
 * @param options - The fetch options.
 * @returns A promise resolving to NanotronFetchResult.
 */
export async function nanotronFetch<TData extends Json>(options: FetchOptions): Promise<NanotronFetchResult<TData>> {
  let rawResponse: Response;
  try {
    rawResponse = await fetch({
      removeDuplicate: 'auto',
      retry: 2,
      retryDelay: 2_000,
      ...options,
    });
  }
  catch (error) {
    return {
      type: 'network_error',
      error,
    };
  }

  let parsedJson: unknown;
  try {
    parsedJson = await rawResponse.json();
  }
  catch (error) {
    return {
      type: 'unexpected_error',
      rawResponse,
      error,
    };
  }

  const isResponseFromNanotron =
    typeof parsedJson === 'object' && parsedJson !== null && typeof (parsedJson as DictionaryOpt).ok === 'boolean';

  if (!isResponseFromNanotron) {
    return {
      type: 'unexpected_error',
      rawResponse,
    };
  }

  const response = parsedJson as ServiceResponse<TData>;

  // status code is not in the range 200-299
  if (!response.ok) {
    return {
      type: 'nanotron_error',
      rawResponse,
      response,
    };
  }

  return {
    type: 'success',
    rawResponse,
    response,
  };
}
