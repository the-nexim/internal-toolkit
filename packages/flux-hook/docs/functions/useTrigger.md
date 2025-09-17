[@nexim/flux-hook](../README.md) / useTrigger

# Function: useTrigger()

> **useTrigger**(`triggerInstance`: `AlwatrTrigger`, `callback`: () => `void`, `deps`: `unknown`[], `options?`: `SubscribeOptions`): `void`

React hook for subscribing to an Alwatr trigger and executing callbacks.

## Parameters

| Parameter         | Type               | Default value | Description                                                  |
| ----------------- | ------------------ | ------------- | ------------------------------------------------------------ |
| `triggerInstance` | `AlwatrTrigger`    | `undefined`   | The Alwatr trigger instance to subscribe to                  |
| `callback`        | () => `void`       | `undefined`   | Function to execute when trigger fires                       |
| `deps`            | `unknown`[]        | `[]`          | Optional dependency array for the subscription (default: []) |
| `options?`        | `SubscribeOptions` | `undefined`   | Optional subscription options                                |

## Returns

`void`

## Example

```tsx
// Create a trigger
const refreshTrigger = new AlwatrTrigger('refresh');

// Basic usage
function DataList() {
  const [data, setData] = useState([]);

  useTrigger(refreshTrigger, () => {
    fetchData().then(setData);
  });

  return (
    <div>
      {data.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}

// With dependencies and options
function ConditionalRefresh({ enabled }: { enabled: boolean }) {
  useTrigger(
    refreshTrigger,
    () => console.log('Refreshed!'),
    [enabled], // Re-subscribe when enabled changes
    { once: true }, // Only trigger once
  );
}
```
