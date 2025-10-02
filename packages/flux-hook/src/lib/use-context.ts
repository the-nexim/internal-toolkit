import { useSyncExternalStore, useCallback } from 'react';

import { logger } from './logger.js';

import type { AlwatrContext, SubscribeOptions } from '@alwatr/flux';

/**
 * React hook for subscribing to an Alwatr context and managing its state.
 *
 *
 * @param contextInstance - The Alwatr context instance to subscribe to
 * @param defaultValue - Default value to use when context is undefined
 * @param options - Optional subscription options
 *
 * @returns The current context state
 *
 * @example
 * ```tsx
 * // Create a context
 * const userContext = new AlwatrContext<User>('user');
 *
 * // Use the context in a component
 * function UserProfile() {
 *   const defaultUser = { name: 'Guest', id: 0 };
 *   const user = useContext(userContext, defaultUser);
 *
 *   return (
 *     <div>
 *       <h1>Welcome {user.name}!</h1>
 *     </div>
 *   );
 * }
 *
 * // With subscription options
 * function UserWithOptions() {
 *   const user = useContext(
 *     userContext,
 *     defaultUser,
 *     { once: true } // Subscription options
 *   );
 *
 *   return <div>{user.name}</div>;
 * }
 * ```
 */
export function useContext<T extends DictionaryOpt>(contextInstance: AlwatrContext<T>, defaultValue: T, options?: SubscribeOptions): T {
  logger.logMethodArgs?.('useContext', { contextInstance, defaultValue });

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const { unsubscribe } = contextInstance.subscribe(onStoreChange, options);
      return unsubscribe;
    },
    [ contextInstance, options ],
  );

  const getSnapshot = useCallback(() => contextInstance.getValue() ?? defaultValue, [ contextInstance, defaultValue ]);

  const getServerSnapshot = useCallback(() => defaultValue, [ defaultValue ]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
