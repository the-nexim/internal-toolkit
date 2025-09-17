import type { ErrorResponse } from '@alwatr/nanotron';
import type { Json } from '@alwatr/type-helper';

export type ErrorServiceResponse = ErrorResponse;

export type SuccessServiceResponse<TData extends Json> = {
  ok: true;
  data: TData;
};

export type ServiceResponse<TData extends Json> = SuccessServiceResponse<TData> | ErrorResponse;
