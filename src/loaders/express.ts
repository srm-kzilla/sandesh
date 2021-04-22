import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import config from '../config';
import routes from '../api';
import { errorHandler, lastRoute } from '../shared/middlewares/errorHandlingMiddleware';

export default ({ app }: { app: express.Application }): void => {
  /**
   * Health Check endpoints
   */

  app.get('/healthcheck', (req, res) => {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    };
    try {
      return res.json(healthcheck);
    } catch (e) {
      return res.status(503).send();
    }
  });

  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // Middleware that helps secure app by setting headers
  app.use(helmet());

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Middleware that transforms the formdata into json
  app.use(bodyParser.urlencoded({ extended: true }));

  // Load API routes
  app.use(config.api.prefix, routes());

  //Error Handling Middleware
  app.use(errorHandler);

  //Error Handling for Call to Not Defined Endpoints
  app.use(lastRoute);
};
