import { fetch, type FetchOptions } from '@alwatr/fetch';

import type { ServiceResponse, NanotronFetchResult } from './type.js';
import type { Json } from '@alwatr/type-helper';

/**
 * Fetches data from Nanotron API and returns a result based on the response.
 * This function implements the safe result pattern architecture, handling network errors,
 * unexpected responses, and service-specific errors without throwing exceptions.
 * It automatically retries failed requests and removes duplicate requests.
 *
 * @typeParam TData - The expected data type from the API response, must extend Json.
 * @param options - The fetch options including URL, and other request parameters.
 * @returns A promise resolving to NanotronFetchResult, which contains the operation outcome
 *          with type indicating success, network error, unexpected error, or nanotron error.
 *
 * @example
 * ```typescript
 * const result = await nanotronFetch<{ userId: string }>({
 *   url: 'https://api.nanotron.com/api/v0/users/',
 *   method: 'GET',
 *   headers: { 'Authorization': 'Bearer token' }
 * });
 *
 * if (result.type === 'success') {
 *   logger.logMethodArgs?.('User data:', result.response.data);
 * } else if (result.type === 'network_error') {
 *   logger.logMethodArgs?.('Network error:', result.error);
 * } else if (result.type === 'nanotron_error') {
 *   logger.logMethodArgs?.('API error:', result.response);
 * } else {
 *   logger.logMethodArgs?.('Unexpected error:', result.error);
 * }
 * ```
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
    const responseToUse = rawResponse.bodyUsed
      ? rawResponse.clone()
      : rawResponse;
    parsedJson = await responseToUse.json();
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
