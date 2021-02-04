import { Router } from 'express';
import { campaignRouteHandler } from './campaigns/router';
import { mailingListRouteHandler } from './mailing-list/router';

export default (): Router => {
  const app = Router();

  app.use('/campaign', campaignRouteHandler());
  app.use('/mailing-list', mailingListRouteHandler());

  return app;
};
