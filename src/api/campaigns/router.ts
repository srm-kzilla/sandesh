import { Request, Response, Router } from 'express';
import { createCampaignSchema, updateCampaignSchema, deleteCampaignSchema } from './schema';
import { requestValidation } from '../../shared/middlewares/validationMiddleware';
import { createCampaign, deleteCampaign, fetchCampaigns, updateCampaign } from './controller';
import { upload } from '../../shared/middlewares/multerMiddleware';

const app = Router();

export const campaignRouteHandler = () => {
  app.get('/', fetchCampaignsHandler);
  app.post('/createCampaign', requestValidation('body', createCampaignSchema), createCampaignHandler);
  app.post('/uploadTemplate', upload.single('template'), campaignTemplateHandler);
  app.put('/', requestValidation('body', updateCampaignSchema), updateCampaignHandler);
  app.delete('/', requestValidation('body', deleteCampaignSchema), deleteCampaignHandler);
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

const deleteCampaignHandler = async (req: Request, res: Response) => {
  try {
    await deleteCampaign(req.body.property as string);
    res.json({ success: true, message: 'Campaign was deleted successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const campaignTemplateHandler = async (req: Request, res: Response) => {
  try {
    res.json({ success: true, data: req.file.filename });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
