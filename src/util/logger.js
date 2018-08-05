const logger = {};

logger.info = (...args) => console.info.apply(console, args);
logger.debug = (...args) => console.info.apply(console, args);

module.exports = logger;
