import { Router } from 'express';
import { campaignRouteHandler } from './campaigns/router';
import { userRouteHandler } from './user/router';
export default (): Router => {
  const app = Router();

  app.use('/campaign', campaignRouteHandler());
  app.use('/user', userRouteHandler());

  return app;
};
