import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
import chalk from 'chalk';
import { LOG_LEVEL } from '../constants';

const levelPrefix = {
  TRACE: chalk.dim,
  DEBUG: chalk.cyanBright,
  INFO: chalk.greenBright,
  WARN: chalk.yellowBright,
  ERROR: chalk.redBright,
};

prefix.reg(log);
prefix.apply(log, {
  format(level: keyof typeof levelPrefix, name) {
    // loglevel defaults to 'root' as a logger name.
    // Don't prepend anything if the name is not set
    return name === 'root' ? '' : `[${levelPrefix[level](level)}] ${name} ::`;
  },
});

log.setDefaultLevel((LOG_LEVEL as log.LogLevelNames) || 'DEBUG');

/**
 * Sets up a logger with a specified name and default log level.
 * @param {string} name - The name of the logger.
 * @param {Object} options - Optional configuration options.
 * @param {log.LogLevelNames} options.defaultLevel - The default log level for the logger.
 * @returns {Logger} The configured logger instance.
 * @throws {Error} Throws an error if no name is provided.
 */
export const setup = (
  name: string,
  { defaultLevel }: { defaultLevel?: log.LogLevelNames } = {},
) => {
  if (!name) {
    throw new Error('Failed to set up logger with no name');
  }

  const child = log.getLogger(name);

  if (defaultLevel) {
    child.setDefaultLevel(defaultLevel);
  }

  return child;
};
