import { Router } from 'express';
import { campaignRouteHandler } from './campaigns/router';

export default (): Router => {
  const app = Router();

  app.use("/campaign", campaignRouteHandler())

  return app;
};
