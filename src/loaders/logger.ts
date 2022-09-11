import winston from 'winston';
import config from '../config';
import 'winston-mongodb';
import database from './database';

const transports = [];
if (process.env.NODE_ENV !== 'development') {
  transports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.cli(), winston.format.splat()),
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

export const MailLogger = async (email: string[], success: boolean) => {
  if (!success) {
    //Failed Emails
    await (await database())
      .collection('mailLogs')
      .insertOne({ email: email, message: 'Email failed', success: false });
    return LoggerInstance.info('Emails failed to send');
  }
  //Success Emails
  await (await database())
    .collection('mailLogs')
    .insertOne({ email: email, message: 'Email successfully sent', success: true });
  return LoggerInstance.info('Emails sent successfully');
};

export default LoggerInstance;
