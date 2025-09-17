[@nexim/api-connect](../README.md) / ServiceResponse

# Type Alias: ServiceResponse\<TData\>

> **ServiceResponse**\<`TData`\> = [`SuccessServiceResponse`](SuccessServiceResponse.md)\<`TData`\> \| `ErrorResponse`

Represents a service response that can be either successful or an error.

## Type Parameters

| Type Parameter           | Description                                            |
| ------------------------ | ------------------------------------------------------ |
| `TData` _extends_ `Json` | The type of data in case of success, must extend Json. |
