import { useEffect, useState, useCallback } from 'react';

import { logger } from './logger.js';

import type { AlwatrSignal, SubscribeOptions } from '@alwatr/flux';

/**
 * React hook for subscribing to an Alwatr signal and managing its state.
 *
 *
 * @param signalInstance - The Alwatr signal instance to subscribe to
 * @param defaultValue - Default value to use when signal hasn't emitted yet
 * @param deps - Optional dependency array for the subscription (default: [])
 * @param options - Optional subscription options
 *
 * @returns The current signal state
 *
 * @example
 * ```tsx
 * // Create a signal
 * const notificationSignal = new AlwatrSignal<Notification>('notification');
 *
 * // Basic usage
 * function NotificationBell() {
 *   const defaultNotification = { message: '', count: 0 };
 *   const notification = useSignal(notificationSignal, defaultNotification);
 *
 *   return (
 *     <div>
 *       {notification.count > 0 && (
 *         <span>{notification.message}</span>
 *       )}
 *     </div>
 *   );
 * }
 *
 * // Advanced usage with dependencies and options
 * function ConditionalNotification({ userId }: { userId: string }) {
 *   const notification = useSignal(
 *     notificationSignal,
 *     defaultNotification,
 *     [userId], // Re-subscribe when userId changes
 *     { once: true } // Only receive first notification
 *   );
 *
 *   return <div>{notification.message}</div>;
 * }
 * ```
 */
export function useSignal<T extends DictionaryOpt>(
  signalInstance: AlwatrSignal<T>,
  defaultValue: T,
  deps: unknown[] = [],
  options?: SubscribeOptions,
): T {
  logger.logMethodArgs?.('useSignal', { signalInstance, defaultValue, deps });

  const [ signalState, setSignalState ] = useState<T>(defaultValue);

  const handleStateChange = useCallback((newState: T) => {
    setSignalState(newState);
  }, []);

  useEffect(() => {
    const { unsubscribe } = signalInstance.subscribe(handleStateChange, options);

    // Clean up subscription on unmount or when dependencies change
    return unsubscribe;
  }, [ signalInstance, handleStateChange, options, ...deps ]);

  return signalState;
}
