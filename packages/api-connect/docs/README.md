# @nexim/api-connect

## Type Aliases

| Type Alias                                                       | Description                                                                                                                                              |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ErrorServiceResponse](type-aliases/ErrorServiceResponse.md)     | Represents an error response from a service, following the standard error format.                                                                        |
| [NanotronFetchResult](type-aliases/NanotronFetchResult.md)       | Result type for Nanotron fetch operations, implementing the safe result pattern. This architecture ensures type-safe error handling without exceptions.  |
| [NitrobaseFetchResult](type-aliases/NitrobaseFetchResult.md)     | Result type for Nitrobase fetch operations, implementing the safe result pattern. This architecture ensures type-safe error handling without exceptions. |
| [ServiceResponse](type-aliases/ServiceResponse.md)               | Represents a service response that can be either successful or an error.                                                                                 |
| [SuccessServiceResponse](type-aliases/SuccessServiceResponse.md) | Represents a successful service response containing data.                                                                                                |

## Functions

| Function                                      | Description                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [nanotronFetch](functions/nanotronFetch.md)   | Fetches data from Nanotron API and returns a result based on the response. This function implements the safe result pattern architecture, handling network errors, unexpected responses, and service-specific errors without throwing exceptions. It automatically retries failed requests and removes duplicate requests. |
| [nitrobaseFetch](functions/nitrobaseFetch.md) | Fetches data from Nitrobase and returns a result based on the response. This function implements the safe result pattern architecture, handling network errors, unexpected responses, and database-specific errors without throwing exceptions. It supports caching strategies and automatically retries failed requests.  |
