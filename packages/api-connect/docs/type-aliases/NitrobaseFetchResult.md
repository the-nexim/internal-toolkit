[@nexim/api-connect](../README.md) / NitrobaseFetchResult

# Type Alias: NitrobaseFetchResult\<TData\>

> **NitrobaseFetchResult**\<`TData`\> = \{ `error`: `unknown`; `type`: `"network_error"`; \} \| \{ `error?`: `unknown`; `rawResponse`: `Response`; `type`: `"unexpected_error"`; \} \| \{ `rawResponse`: `Response`; `response`: [`ErrorServiceResponse`](ErrorServiceResponse.md); `type`: `"nitrobase_error"`; \} \| \{ `db`: `TData`; `rawResponse`: `Response`; `type`: `"success"`; \}

Result type for Nitrobase fetch operations, implementing the safe result pattern.
This architecture ensures type-safe error handling without exceptions.

## Type Parameters

| Type Parameter                 | Description                                                     |
| ------------------------------ | --------------------------------------------------------------- |
| `TData` _extends_ `JsonObject` | The expected data type from the database, must be a JsonObject. |
