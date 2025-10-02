import { createLogger } from '@alwatr/logger';
import { platformInfo } from '@alwatr/platform-info';

export const logger = createLogger('flux-hook');

if (platformInfo.isNode) {
  logger.logMethod = undefined;
  logger.logMethodArgs = undefined;
  logger.logFileModule = undefined;
  logger.logProperty = undefined;
  logger.logOther = undefined;
  logger.incident = undefined;
  logger.logStep = undefined;
  logger.logMethodFull = undefined;
  logger.time = undefined;
  logger.timeEnd = undefined;
}
