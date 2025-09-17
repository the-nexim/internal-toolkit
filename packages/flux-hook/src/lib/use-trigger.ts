import { useEffect } from 'react';

import { logger } from './logger.js';

import type { AlwatrTrigger, SubscribeOptions } from '@alwatr/flux';

/**
 * React hook for subscribing to an Alwatr trigger and executing callbacks.
 *
 * @param triggerInstance - The Alwatr trigger instance to subscribe to
 * @param callback - Function to execute when trigger fires
 * @param deps - Optional dependency array for the subscription (default: [])
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
 * // With dependencies and options
 * function ConditionalRefresh({ enabled }: { enabled: boolean }) {
 *   useTrigger(
 *     refreshTrigger,
 *     () => console.log('Refreshed!'),
 *     [enabled], // Re-subscribe when enabled changes
 *     { once: true } // Only trigger once
 *   );
 * }
 * ```
 */
export function useTrigger(triggerInstance: AlwatrTrigger, callback: () => void, deps: unknown[] = [], options?: SubscribeOptions): void {
  logger.logMethodArgs?.('useTrigger', { triggerInstance, callback, deps });

  useEffect(() => {
    const { unsubscribe } = triggerInstance.subscribe(callback, options);

    // Clean up subscription on unmount or when dependencies change
    return unsubscribe;
  }, [ triggerInstance, callback, options, ...deps ]);
}
