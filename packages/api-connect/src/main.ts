import { packageTracer } from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export { nanotronFetch } from './lib/nanotron-fetch.js';
export { nitrobaseFetch } from './lib/nitrobase-fetch.js';
export type {
  NitrobaseFetchResult,
  NanotronFetchResult,
  ServiceResponse,
  SuccessServiceResponse,
  ErrorServiceResponse,
} from './lib/type.js';
