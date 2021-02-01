import { Request, Response, Router } from 'express';
import { fetchCampaigns } from './controller';

const app = Router();
export const campaignRouteHandler = () => {
  app.get('/', fetchCampaignsHandler);
  return app;
};
const fetchCampaignsHandler = async (req: Request, res: Response) => {
  try {
    res.json(await fetchCampaigns());
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
