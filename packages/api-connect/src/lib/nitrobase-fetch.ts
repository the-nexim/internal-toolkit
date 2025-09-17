import { fetch } from '@alwatr/fetch';
import { getStorePath } from '@alwatr/nitrobase-helper';

import type { ErrorServiceResponse, NitrobaseFetchResult } from './type.js';
import type { CollectionContext, DocumentContext, StoreFileStat } from '@alwatr/nitrobase-types';

/**
 * Fetches data from Nitrobase and returns a result based on the response.
 * This function implements the safe result pattern architecture, handling network errors,
 * unexpected responses, and database-specific errors without throwing exceptions.
 * It supports caching strategies and automatically retries failed requests.
 *
 * @typeParam TData - The expected data type from the database response, must be DocumentContext or CollectionContext.
 * @param options - The fetch options object containing:
 *   - storeBase: The base URL or path for the Nitrobase store
 *   - storeFileStat: The store file statistics for path generation
 *   - authorizationHeader: The authorization header value for API access
 *   - cacheStrategy: Optional caching strategy, defaults to 'update_cache'
 * @returns A promise resolving to NitrobaseFetchResult, which contains the operation outcome
 *          with type indicating success, network error, unexpected error, or nitrobase error.
 *
 * @example
 * ```typescript
 * const result = await nitrobaseFetch<CollectionContext<Message>>({
 *   storeBase: 'https://api.nitrobase.com/stores/',
 *   storeFileStat: { ... },
 *   authorizationHeader: 'Alwatr user:token',
 *   cacheStrategy: 'cache_first'
 * });
 *
 * if (result.type === 'success') {
 *   console.log('Document data:', result.db);
 * } else if (result.type === 'network_error') {
 *   console.error('Network error:', result.error);
 * } else if (result.type === 'nitrobase_error') {
 *   console.error('Database error:', result.response);
 * } else {
 *   console.error('Unexpected error:', result.error);
 * }
 * ```
 */
export async function nitrobaseFetch<TData extends DocumentContext | CollectionContext>(options: {
  storeBase: string;
  storeFileStat: StoreFileStat;
  authorizationHeader: string;
  cacheStrategy?: 'update_cache' | 'cache_first';
}): Promise<NitrobaseFetchResult<TData>> {
  const url = `${options.storeBase}${getStorePath(options.storeFileStat)}`;

  options.cacheStrategy ??= 'update_cache';

  console.log('Fetching from Nitrobase:', url); // Logging for the team

  let rawResponse: Response;
  try {
    rawResponse = await fetch({
      removeDuplicate: 'auto',
      retry: 2,
      retryDelay: 2_000,
      url,
      headers: { authorization: options.authorizationHeader },
      cacheStrategy: options.cacheStrategy,
    });
  }
  catch (error) {
    console.error('Network error in nitrobaseFetch:', error); // Logging
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
    console.error('Unexpected error parsing JSON in nitrobaseFetch:', error); // Logging
    return {
      type: 'unexpected_error',
      rawResponse,
      error,
    };
  }

  const isResponseFromNitrobase = // Fixed: was 'isResponseFromNanotron', assuming same format
    typeof parsedJson === 'object' && parsedJson !== null && typeof (parsedJson as DictionaryOpt).ok === 'boolean';

  if (!isResponseFromNitrobase) {
    console.warn('Unexpected response format in nitrobaseFetch'); // Logging
    return {
      type: 'unexpected_error',
      rawResponse,
    };
  }

  const response = parsedJson as ErrorServiceResponse | TData;

  // status code is not in the range 200-299
  if (!response.ok) {
    console.error('Nitrobase error:', response); // Logging
    return {
      type: 'nitrobase_error',
      rawResponse,
      response,
    };
  }

  console.log('Success in nitrobaseFetch'); // Logging
  return {
    type: 'success',
    rawResponse,
    db: response,
  };
}
