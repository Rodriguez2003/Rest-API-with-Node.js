const winston = require("winston");

const loggers = {
  mjson: winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      winston.format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
    transports: [
      new winston.transports.File({ filename: "logs/app-info.log" }),
      new winston.transports.Console({
        format: winston.format.json(),
      }),
    ],
  }),

  simple: winston.createLogger({
    level: "error",
    format: winston.format.combine(
      winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      winston.format.printf(
        (info) =>
          `${info.level}: ${[info.timestamp]}: ${info.name}: ${info.parent}`
      )
    ),
    transports: [
      new winston.transports.File({ filename: "logs/app-error.log" }),
    ],
  }),
};

module.exports = loggers;
