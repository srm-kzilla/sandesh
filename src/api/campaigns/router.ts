import { Request, Response, Router } from 'express';
import * as yup from 'yup';
import { requestValidation } from '../../shared/middlewares/validationMiddleware';
import { createCampaign, deleteCampaign, fetchCampaigns, updateCampaign } from './controller';

const campaignSchema = {
  title: yup.string().required().trim(),
  mailingList: yup.string().required().trim(),
  startFrom: yup.string().required().trim(),
  endAt: yup.string().required().trim(),
  isolatedEmails: yup.array().of(yup.string()).notRequired(),
  typeOfCampaign: yup.string().required().oneOf(['single', 'campaign']),
};

const createCampaignSchema = new yup.ObjectSchema(campaignSchema);
const updateCampaignSchema = new yup.ObjectSchema({ ...campaignSchema, id: yup.string().required().trim() });
const deleteCampaignSchema = new yup.ObjectSchema({ property: yup.string().required().trim() });

const app = Router();
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const campaignRouteHandler = () => {
  app.get('/', fetchCampaignsHandler);
  app.post('/', requestValidation('body', createCampaignSchema), createCampaignHandler);
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
