import { ErrorRequestHandler } from 'express';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new DailyRotateFile({
      dirname: 'logs',
      filename: '%DATE%-error.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '10d',
      zippedArchive: true,
    }),
  ],
});

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV !== 'production') {
    logger.error({
      message: err.message,
      stack: err.stack,
      statusCode,
      method: req.method,
      url: req.originalUrl,
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
  });

  return;
};
