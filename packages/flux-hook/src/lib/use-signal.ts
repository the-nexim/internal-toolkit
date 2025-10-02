import { useSyncExternalStore, useCallback, useRef } from 'react';

import { logger } from './logger.js';

import type { AlwatrSignal, SubscribeOptions } from '@alwatr/flux';

/**
 * React hook for subscribing to an Alwatr signal and managing its state.
 *
 *
 * @param signalInstance - The Alwatr signal instance to subscribe to
 * @param defaultValue - Default value to use when signal hasn't emitted yet
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
 * // Advanced usage with options
 * function ConditionalNotification() {
 *   const notification = useSignal(
 *     notificationSignal,
 *     defaultNotification,
 *     { once: true } // Only receive first notification
 *   );
 *
 *   return <div>{notification.message}</div>;
 * }
 * ```
 */
export function useSignal<T extends DictionaryOpt>(signalInstance: AlwatrSignal<T>, defaultValue: T, options?: SubscribeOptions): T {
  logger.logMethodArgs?.('useSignal', { signalInstance, defaultValue });

  const latestValueRef = useRef<T>(defaultValue);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const { unsubscribe } = signalInstance.subscribe((newValue: T) => {
        latestValueRef.current = newValue;
        onStoreChange();
      }, options);
      return unsubscribe;
    },
    [ signalInstance, options ],
  );

  const getSnapshot = useCallback(() => latestValueRef.current, []);

  const getServerSnapshot = useCallback(() => defaultValue, [ defaultValue ]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
