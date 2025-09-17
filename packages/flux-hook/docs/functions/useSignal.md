[@nexim/flux-hook](../README.md) / useSignal

# Function: useSignal()

> **useSignal**\<`T`\>(`signalInstance`: `AlwatrSignal`\<`T`\>, `defaultValue`: `T`, `deps`: `unknown`[], `options?`: `SubscribeOptions`): `T`

React hook for subscribing to an Alwatr signal and managing its state.

## Type Parameters

| Type Parameter                         |
| -------------------------------------- |
| `T` _extends_ `DictionaryOpt`\<`any`\> |

## Parameters

| Parameter        | Type                  | Default value | Description                                                  |
| ---------------- | --------------------- | ------------- | ------------------------------------------------------------ |
| `signalInstance` | `AlwatrSignal`\<`T`\> | `undefined`   | The Alwatr signal instance to subscribe to                   |
| `defaultValue`   | `T`                   | `undefined`   | Default value to use when signal hasn't emitted yet          |
| `deps`           | `unknown`[]           | `[]`          | Optional dependency array for the subscription (default: []) |
| `options?`       | `SubscribeOptions`    | `undefined`   | Optional subscription options                                |

## Returns

`T`

The current signal state

## Example

```tsx
// Create a signal
const notificationSignal = new AlwatrSignal<Notification>('notification');

// Basic usage
function NotificationBell() {
  const defaultNotification = { message: '', count: 0 };
  const notification = useSignal(notificationSignal, defaultNotification);

  return <div>{notification.count > 0 && <span>{notification.message}</span>}</div>;
}

// Advanced usage with dependencies and options
function ConditionalNotification({ userId }: { userId: string }) {
  const notification = useSignal(
    notificationSignal,
    defaultNotification,
    [userId], // Re-subscribe when userId changes
    { once: true }, // Only receive first notification
  );

  return <div>{notification.message}</div>;
}
```
