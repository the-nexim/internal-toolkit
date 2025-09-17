[@nexim/api-connect](../README.md) / nanotronFetch

# Function: nanotronFetch()

> **nanotronFetch**\<`TData`\>(`options`: `FetchOptions`): `Promise`\<[`NanotronFetchResult`](../type-aliases/NanotronFetchResult.md)\<`TData`\>\>

Fetches data from Nanotron API and returns a result based on the response.
This function implements the safe result pattern architecture, handling network errors,
unexpected responses, and service-specific errors without throwing exceptions.
It automatically retries failed requests and removes duplicate requests.

## Type Parameters

| Type Parameter           | Description                                                     |
| ------------------------ | --------------------------------------------------------------- |
| `TData` _extends_ `Json` | The expected data type from the API response, must extend Json. |

## Parameters

| Parameter | Type           | Description                                                    |
| --------- | -------------- | -------------------------------------------------------------- |
| `options` | `FetchOptions` | The fetch options including URL, and other request parameters. |

## Returns

`Promise`\<[`NanotronFetchResult`](../type-aliases/NanotronFetchResult.md)\<`TData`\>\>

A promise resolving to NanotronFetchResult, which contains the operation outcome
with type indicating success, network error, unexpected error, or nanotron error.

## Example

```typescript
const result = await nanotronFetch<{ userId: string }>({
  url: 'https://api.nanotron.com/api/v0/users/',
  method: 'GET',
  headers: { Authorization: 'Bearer token' },
});

if (result.type === 'success') {
  console.log('User data:', result.response.data);
} else if (result.type === 'network_error') {
  console.error('Network error:', result.error);
} else if (result.type === 'nanotron_error') {
  console.error('API error:', result.response);
} else {
  console.error('Unexpected error:', result.error);
}
```
