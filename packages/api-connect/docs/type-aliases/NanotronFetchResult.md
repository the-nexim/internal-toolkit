[@nexim/api-connect](../README.md) / NanotronFetchResult

# Type Alias: NanotronFetchResult\<TData\>

> **NanotronFetchResult**\<`TData`\> = \{ `error`: `unknown`; `type`: `"network_error"`; \} \| \{ `error?`: `unknown`; `rawResponse`: `Response`; `type`: `"unexpected_error"`; \} \| \{ `rawResponse`: `Response`; `response`: [`ErrorServiceResponse`](ErrorServiceResponse.md); `type`: `"nanotron_error"`; \} \| \{ `rawResponse`: `Response`; `response`: [`SuccessServiceResponse`](SuccessServiceResponse.md)\<`TData`\>; `type`: `"success"`; \}

Result type for Nanotron fetch operations, implementing the safe result pattern.
This architecture ensures type-safe error handling without exceptions.

## Type Parameters

| Type Parameter           | Description                                            |
| ------------------------ | ------------------------------------------------------ |
| `TData` _extends_ `Json` | The expected data type from the API, must extend Json. |
