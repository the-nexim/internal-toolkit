[@nexim/api-connect](../README.md) / nitrobaseFetch

# Function: nitrobaseFetch()

> **nitrobaseFetch**\<`TData`\>(`options`: `object`): `Promise`\<[`NitrobaseFetchResult`](../type-aliases/NitrobaseFetchResult.md)\<`TData`\>\>

Fetches data from Nitrobase and returns a result based on the response.
This function implements the safe result pattern architecture, handling network errors,
unexpected responses, and database-specific errors without throwing exceptions.
It supports caching strategies and automatically retries failed requests.

## Type Parameters

| Type Parameter                                             | Description                                                                                      |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `TData` _extends_ `DocumentContext` \| `CollectionContext` | The expected data type from the database response, must be DocumentContext or CollectionContext. |

## Parameters

| Parameter                     | Type                                                                                                                                                   | Description                                                                                                                                                                                                                                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`                     | \{ `authorizationHeader`: `string`; `cacheStrategy?`: `"update_cache"` \| `"cache_first"`; `storeBase`: `string`; `storeFileStat`: `StoreFileStat`; \} | The fetch options object containing: - storeBase: The base URL or path for the Nitrobase store - storeFileStat: The store file statistics for path generation - authorizationHeader: The authorization header value for API access - cacheStrategy: Optional caching strategy, defaults to 'update_cache' |
| `options.authorizationHeader` | `string`                                                                                                                                               | -                                                                                                                                                                                                                                                                                                         |
| `options.cacheStrategy?`      | `"update_cache"` \| `"cache_first"`                                                                                                                    | -                                                                                                                                                                                                                                                                                                         |
| `options.storeBase`           | `string`                                                                                                                                               | -                                                                                                                                                                                                                                                                                                         |
| `options.storeFileStat`       | `StoreFileStat`                                                                                                                                        | -                                                                                                                                                                                                                                                                                                         |

## Returns

`Promise`\<[`NitrobaseFetchResult`](../type-aliases/NitrobaseFetchResult.md)\<`TData`\>\>

A promise resolving to NitrobaseFetchResult, which contains the operation outcome
with type indicating success, network error, unexpected error, or nitrobase error.

## Example

```typescript
const result = await nitrobaseFetch<CollectionContext<Message>>({
  storeBase: 'https://api.nitrobase.com/stores/',
  storeFileStat: { ... },
  authorizationHeader: 'Alwatr user:token',
  cacheStrategy: 'cache_first'
});

if (result.type === 'success') {
  console.log('Document data:', result.db);
} else if (result.type === 'network_error') {
  console.error('Network error:', result.error);
} else if (result.type === 'nitrobase_error') {
  console.error('Database error:', result.response);
} else {
  console.error('Unexpected error:', result.error);
}
```
