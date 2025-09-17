import { fetch } from '@alwatr/fetch';

import { generateStorePath } from './generate-store-path';

import type { ErrorServiceResponse } from './lib/service-response.js';
import type { CollectionContext, DocumentContext, StoreFileStat } from '@alwatr/nitrobase-types';

// Define Result types for the safe result pattern
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
 * Fetches data from Nitrobase and returns a result based on the response.
 * @param options - The fetch options.
 * @returns A promise resolving to NitrobaseFetchResult.
 */
export async function nitrobaseFetch<TData extends DocumentContext | CollectionContext>(options: {
  storeBase: string;
  storeFileStat: StoreFileStat;
  authorizationHeader: string;
  cacheStrategy?: 'update_cache' | 'cache_first';
}): Promise<NitrobaseFetchResult<TData>> {
  const url = generateStorePath(options.storeBase, options.storeFileStat);

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
