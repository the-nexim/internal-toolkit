import { packageTracer } from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export { nanotronFetch } from './nanotron-fetch.js';
export { nitrobaseFetch } from './nitrobase-fetch.js';
