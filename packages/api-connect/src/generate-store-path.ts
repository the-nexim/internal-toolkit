import { getStorePath } from '@alwatr/nitrobase-helper';

import type { StoreFileStat } from '@alwatr/nitrobase-types';

/**
 * Generates a store path by combining the base path with the path derived from store statistics.
 * @param storeBase - The base path for the store.
 * @param storeStat - The store file statistics.
 * @returns The full store path.
 */
export function generateStorePath(storeBase: string, storeStat: StoreFileStat): string {
  return `${storeBase}${getStorePath(storeStat)}`;
}
