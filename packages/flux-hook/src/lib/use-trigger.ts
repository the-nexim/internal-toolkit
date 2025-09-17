import { createLogger } from '@alwatr/logger';
import { platformInfo } from '@alwatr/platform-info';
import { useEffect } from 'react';

import type { AlwatrTrigger, SubscribeOptions } from '@alwatr/flux';

const logger = createLogger('flux-hook');

if (platformInfo.isNode) {
  logger.logMethod = undefined;
  logger.logMethodArgs = undefined;
  logger.logFileModule = undefined;
  logger.logProperty = undefined;
  logger.logOther = undefined;
  logger.incident = undefined;
  logger.logStep = undefined;
  logger.logMethodFull = undefined;
  logger.time = undefined;
  logger.timeEnd = undefined;
}

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
 *   useTrigger(refreshTrigger, () => {
 *     fetchData().then(setData);
 *   });
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
  }, [ triggerInstance, callback, ...deps ]);
}
