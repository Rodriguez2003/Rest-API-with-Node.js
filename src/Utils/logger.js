const winston = require("winston");
const winstonMysql = require("winston-mysql");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.metadata({
      fillExcept: ["message", "level", "timestamp", "label"],
    }),
    winston.format.printf((info) => {
      let out = `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
      if (info.metadata.error) {
        out = out + " " + info.metadata.error;
        if (info.metadata.error.stack) {
          out = out + " " + info.metadata.error.stack;
        }
      }
      return out;
    })
  ),
  transports: [
    new winstonMysql({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      table: process.env.DB_TABLE,
    }),
  ],
});

module.exports = logger;
