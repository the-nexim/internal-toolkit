[@nexim/flux-hook](../README.md) / useTrigger

# Function: useTrigger()

> **useTrigger**(`triggerInstance`: `AlwatrTrigger`, `callback`: () => `void`, `options?`: `SubscribeOptions`): `void`

React hook for subscribing to an Alwatr trigger and executing callbacks.

## Parameters

| Parameter         | Type               | Description                                 |
| ----------------- | ------------------ | ------------------------------------------- |
| `triggerInstance` | `AlwatrTrigger`    | The Alwatr trigger instance to subscribe to |
| `callback`        | () => `void`       | Function to execute when trigger fires      |
| `options?`        | `SubscribeOptions` | Optional subscription options               |

## Returns

`void`

## Example

```tsx
// Create a trigger
const refreshTrigger = new AlwatrTrigger('refresh');

// Basic usage
function DataList() {
  const [data, setData] = useState([]);

  useTrigger(
    refreshTrigger,
    useCallback(() => {
      fetchData().then(setData);
    }, []),
  );

  return (
    <div>
      {data.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}

// With subscription options
function ConditionalRefresh() {
  useTrigger(
    refreshTrigger,
    () => console.log('Refreshed!'),
    { once: true }, // Only trigger once
  );
}
```
