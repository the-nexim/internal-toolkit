[@nexim/api-connect](../README.md) / nitrobaseFetch

# Function: nitrobaseFetch()

> **nitrobaseFetch**\<`TData`\>(`options`: `object`): `Promise`\<`NitrobaseFetchResult`\<`TData`\>\>

Fetches data from Nitrobase and returns a result based on the response.

## Type Parameters

| Type Parameter                                             |
| ---------------------------------------------------------- |
| `TData` _extends_ `DocumentContext` \| `CollectionContext` |

## Parameters

| Parameter                     | Type                                                                                                                                                   | Description        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `options`                     | \{ `authorizationHeader`: `string`; `cacheStrategy?`: `"update_cache"` \| `"cache_first"`; `storeBase`: `string`; `storeFileStat`: `StoreFileStat`; \} | The fetch options. |
| `options.authorizationHeader` | `string`                                                                                                                                               | -                  |
| `options.cacheStrategy?`      | `"update_cache"` \| `"cache_first"`                                                                                                                    | -                  |
| `options.storeBase`           | `string`                                                                                                                                               | -                  |
| `options.storeFileStat`       | `StoreFileStat`                                                                                                                                        | -                  |

## Returns

`Promise`\<`NitrobaseFetchResult`\<`TData`\>\>

A promise resolving to NitrobaseFetchResult.
