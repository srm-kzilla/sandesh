import winston from 'winston';
import config from '../config';
import MongoDB from 'winston-mongodb';

const transports = [];
if (process.env.NODE_ENV !== 'development') {
  transports.push(new winston.transports.Console());
  transports.push(
    new winston.transports.MongoDB({
      level: config.logs.level,
      db: config.databaseURL,
      collection: 'logs',
      options: { useUnifiedTopology: true },
    }),
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.cli(), winston.format.splat()),
    }),
  );
  transports.push(
    new winston.transports.MongoDB({
      level: config.logs.level,
      db: config.databaseURL,
      collection: 'logs',
      options: {
        useUnifiedTopology: true,
        format: winston.format.combine(winston.format.cli(), winston.format.splat()),
      },
    }),
  );
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports,
});

export default LoggerInstance;
