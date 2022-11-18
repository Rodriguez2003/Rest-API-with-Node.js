const { createLogger, transports, format } = require("winston");
const winston = require("winston");
require("winston-couchdb").Couchdb;

const loggerFormat = format.combine(
  format.errors({ stack: true }),
  format.timestamp(),
  format.metadata(),
  format.json()
);

const consoleFormat = {
  format: format.combine(
    format.splat(),
    format.simple(),
    format.errors({ stack: true })
  ),
  level: "info",
  defaultMeta: { operation: "server running" },
  handleExceptions: true,
  json: false,
  colorize: true,
};

const logger = winston.createLogger({
  level: "info",
  format: loggerFormat,
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console(consoleFormat),
  ],
});

winston.add(logger);
//new winston.transports.File();

module.exports = logger;
