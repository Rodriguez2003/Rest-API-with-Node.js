/* const winston = require("winston");

// const remoteLog = new winston.transports.Http({
//   host: "localhost",
//   port: 5984,
//   path: "/example",
// });

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    filename: `logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  Http: {
    level: "info",
    host: "localhost",
    port: 5984,
    path: "/example",
    handleExceptions: true,
    json: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
let logger;
if (process.env.logging === "off") {
  logger = winston.createLogger({
    transports: [new winston.transports.File(options.file)],
    exitOnError: false, // do not exit on handled exceptions
  });
} else {
  logger = winston.createLogger({
    defaultMeta: { operation: "" },
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console),
      new winston.transports.Http(options.file),
    ],
    exitOnError: false, // do not exit on handled exceptions
  });
}

// create a stream object with a 'write' function that will be used by `morgan`
// logger.stream = {
//   write(message) {
//     logger.info(message);
//   },
// };

module.exports = logger;
 */

const { createLogger, format, transports } = require("winston");
const winston = require("winston");
winstonCouch = require("winston-couchdb").Couchdb;

winston.add(new winstonCouch(), {
  host: "localhost",
  port: 5984,
  db: "winston",
  // optional
  auth: { username: "Admin", password: "12345" },
  secure: false,
});

const options = {
  file: {
    filename: `src/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console),
  ],
});

module.exports = logger;
