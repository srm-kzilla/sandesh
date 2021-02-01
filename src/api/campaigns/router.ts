import { Request, Response, Router } from 'express';
import { createCampaign, fetchCampaigns, updateCampaign } from './controller';

const app = Router();
export const campaignRouteHandler = () => {
  app.get('/', fetchCampaignsHandler);
  app.post('/', createCampaignHandler);
  app.put('/', updateCampaignHandler);
  return app;
};
const fetchCampaignsHandler = async (req: Request, res: Response) => {
  try {
    res.json(await fetchCampaigns());
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const createCampaignHandler = async (req: Request, res: Response) => {
  try {
    await createCampaign(req.body);
    res.json({ success: true, message: 'Campaign was created successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateCampaignHandler = async (req: Request, res: Response) => {
  try {
    await updateCampaign(req.body);
    res.json({ success: true, message: 'Campaign was updated successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
