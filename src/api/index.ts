import { Router } from 'express';
import { campaignRouteHandler } from './campaigns/router';
import { userRouteHandler } from './user/router';
import { apiKeyRouteHandler } from './keys/router';
import { mailingListHandler } from './mailingList/router';

export default (): Router => {
  const app = Router();
  app.use('/campaign', campaignRouteHandler());
  app.use('/user', userRouteHandler());
  app.use('/key', apiKeyRouteHandler());
  app.use('/mailingList', mailingListHandler());

  return app;
};
