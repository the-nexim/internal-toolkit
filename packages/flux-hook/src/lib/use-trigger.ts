import { useEffect } from 'react';

import { logger } from './logger.js';

import type { AlwatrTrigger, SubscribeOptions } from '@alwatr/flux';

/**
 * React hook for subscribing to an Alwatr trigger and executing callbacks.
 *
 * @param triggerInstance - The Alwatr trigger instance to subscribe to
 * @param callback - Function to execute when trigger fires
 * @param options - Optional subscription options
 *
 * @example
 * ```tsx
 * // Create a trigger
 * const refreshTrigger = new AlwatrTrigger('refresh');
 *
 * // Basic usage
 * function DataList() {
 *   const [data, setData] = useState([]);
 *
 *     useTrigger(refreshTrigger, useCallback(() => {
    fetchData().then(setData);
  }, []));
 *
 *   return <div>{data.map(item => <Item key={item.id} {...item} />)}</div>;
 * }
 *
 * // With subscription options
 * function ConditionalRefresh() {
 *   useTrigger(
 *     refreshTrigger,
 *     () => console.log('Refreshed!'),
 *     { once: true } // Only trigger once
 *   );
 * }
 * ```
 */
export function useTrigger(triggerInstance: AlwatrTrigger, callback: () => void, options?: SubscribeOptions): void {
  logger.logMethodArgs?.('useTrigger', { triggerInstance, callback });

  useEffect(() => {
    const { unsubscribe } = triggerInstance.subscribe(callback, options);

    return unsubscribe;
  }, [ triggerInstance, callback, options ]);
}
