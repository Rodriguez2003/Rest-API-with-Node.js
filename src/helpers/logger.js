const { createLogger, transports, format } = require("winston");

const logInfo = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { operation: "server running" },
  transports: [new transports.Console({})],
});

const logErr = createLogger({
  level: "error",
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { operation: "INSERT" },
  transports: [new transports.Console({})],
});

module.exports = {
  logInfo,
  logErr,
};
