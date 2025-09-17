[@nexim/flux-hook](../README.md) / useContext

# Function: useContext()

> **useContext**\<`T`\>(`contextInstance`: `AlwatrContext`\<`T`\>, `defaultValue`: `T`, `deps`: `unknown`[], `options?`: `SubscribeOptions`): `T`

React hook for subscribing to an Alwatr context and managing its state.

## Type Parameters

| Type Parameter                         |
| -------------------------------------- |
| `T` _extends_ `DictionaryOpt`\<`any`\> |

## Parameters

| Parameter         | Type                   | Default value | Description                                                  |
| ----------------- | ---------------------- | ------------- | ------------------------------------------------------------ |
| `contextInstance` | `AlwatrContext`\<`T`\> | `undefined`   | The Alwatr context instance to subscribe to                  |
| `defaultValue`    | `T`                    | `undefined`   | Default value to use when context is undefined               |
| `deps`            | `unknown`[]            | `[]`          | Optional dependency array for the subscription (default: []) |
| `options?`        | `SubscribeOptions`     | `undefined`   | Optional subscription options                                |

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

// With dependencies and options
function UserWithDeps() {
  const [userId, setUserId] = useState(1);
  const user = useContext(
    userContext,
    defaultUser,
    [userId], // Re-subscribe when userId changes
    { once: true }, // Subscription options
  );

  return <div>{user.name}</div>;
}
```
