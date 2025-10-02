[@nexim/flux-hook](../README.md) / useContext

# Function: useContext()

> **useContext**\<`T`\>(`contextInstance`: `AlwatrContext`\<`T`\>, `defaultValue`: `T`, `options?`: `SubscribeOptions`): `T`

React hook for subscribing to an Alwatr context and managing its state.

## Type Parameters

| Type Parameter                         |
| -------------------------------------- |
| `T` _extends_ `DictionaryOpt`\<`any`\> |

## Parameters

| Parameter         | Type                   | Description                                    |
| ----------------- | ---------------------- | ---------------------------------------------- |
| `contextInstance` | `AlwatrContext`\<`T`\> | The Alwatr context instance to subscribe to    |
| `defaultValue`    | `T`                    | Default value to use when context is undefined |
| `options?`        | `SubscribeOptions`     | Optional subscription options                  |

## Returns

`T`

The current context state

## Example

```tsx
// Create a context
const userContext = new AlwatrContext<User>('user');

// Use the context in a component
function UserProfile() {
  const defaultUser = { name: 'Guest', id: 0 };
  const user = useContext(userContext, defaultUser);

  return (
    <div>
      <h1>Welcome {user.name}!</h1>
    </div>
  );
}

// With subscription options
function UserWithOptions() {
  const user = useContext(
    userContext,
    defaultUser,
    { once: true }, // Subscription options
  );

  return <div>{user.name}</div>;
}
```
