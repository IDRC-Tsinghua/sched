var winston = require("winston");
var sched_config = require("./sched_config");
var logger = new (winston.Logger) ({

    transports : [
        new (winston.transports.Console)({ json: false, timestamp: true }),
        new winston.transports.File({ filename: sched_config.logger_file, json: false })
    ],
    exceptionHandlers: [
        new (winston.transports.Console)({ json: false, timestamp: true }),
        new winston.transports.File({ filename: sched_config.logger_exceptions_file, json: false })
    ],
    exitOnError: false,
    level: "debug"
});

module.exports = logger;
