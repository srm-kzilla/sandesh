import { Router } from 'express';
import { campaignRouteHandler } from './campaigns/router';
import { authRouteHandler } from './Auth/router'
export default (): Router => {
  const app = Router();

  app.use("/campaign", campaignRouteHandler())
  
  app.use("/auth",authRouteHandler())
  
  return app;
};
