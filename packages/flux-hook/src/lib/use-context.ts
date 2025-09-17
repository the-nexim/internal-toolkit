import { useEffect, useState, useCallback } from 'react';

import { logger } from './logger.js';

import type { AlwatrContext, SubscribeOptions } from '@alwatr/flux';

/**
 * React hook for subscribing to an Alwatr context and managing its state.
 *
 *
 * @param contextInstance - The Alwatr context instance to subscribe to
 * @param defaultValue - Default value to use when context is undefined
 * @param deps - Optional dependency array for the subscription (default: [])
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
 * // With dependencies and options
 * function UserWithDeps() {
 *   const [userId, setUserId] = useState(1);
 *   const user = useContext(
 *     userContext,
 *     defaultUser,
 *     [userId], // Re-subscribe when userId changes
 *     { once: true } // Subscription options
 *   );
 *
 *   return <div>{user.name}</div>;
 * }
 * ```
 */
export function useContext<T extends DictionaryOpt>(
  contextInstance: AlwatrContext<T>,
  defaultValue: T,
  deps: unknown[] = [],
  options?: SubscribeOptions,
): T {
  logger.logMethodArgs?.('useContext', { contextInstance, defaultValue, deps });

  const [ contextState, setContextState ] = useState<T>(contextInstance.getValue() ?? defaultValue);

  const handleStateChange = useCallback((newState: T) => {
    setContextState(newState);
  }, []);

  useEffect(() => {
    // Set initial state in case it changed between useState initialization and useEffect execution
    logger.logMethodArgs?.('useContext.stateChange', { defaultValue });

    const { unsubscribe } = contextInstance.subscribe(handleStateChange, options);

    // Clean up subscription on unmount or when dependencies change
    return unsubscribe;
  }, [ contextInstance, handleStateChange, ...deps ]);

  return contextState;
}
