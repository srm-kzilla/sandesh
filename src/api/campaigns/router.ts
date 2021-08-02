import { Request, Response, Router } from 'express';
import { createCampaignSchema, updateCampaignSchema, deleteCampaignSchema } from './schema';
import { requestValidation } from '../../shared/middlewares/validationMiddleware';
import { createCampaign, deleteCampaign, fetchCampaigns, updateCampaign } from './controller';
import { upload, uploadCSV } from '../../shared/middlewares/multerMiddleware';
import { authMiddleware } from '../../shared/middlewares/authMiddleware';
import errorClass from '../../shared/error';
import { NextFunction } from 'connect';

const app = Router();

export const campaignRouteHandler = () => {
  app.get('/', authMiddleware, fetchCampaignsHandler);
  app.post('/createCampaign', authMiddleware, requestValidation('body', createCampaignSchema), createCampaignHandler);
  app.post('/uploadTemplate', authMiddleware, upload.single('template'), campaignTemplateHandler);
  app.post('/uploadCSV', authMiddleware, uploadCSV.single('template'), campaignCsvHandler);
  app.put('/', authMiddleware, requestValidation('body', updateCampaignSchema), updateCampaignHandler);
  app.delete('/', authMiddleware, requestValidation('body', deleteCampaignSchema), deleteCampaignHandler);
  return app;
};

const fetchCampaignsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await fetchCampaigns(next));
  } catch (error) {
    next(new errorClass(error.message, 401));
  }
};

const createCampaignHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createCampaign(req.body, next);
    res.json({ success: true, message: 'Campaign was created successfully' });
  } catch (error) {
    next(new errorClass(error.message, 401));
  }
};

const updateCampaignHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateCampaign(req.body, next);
    res.json({ success: true, message: 'Campaign was updated successfully' });
  } catch (error) {
    next(new errorClass(error.message, 401));
  }
};

const deleteCampaignHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteCampaign(req.body.property as string, next);
    res.json({ success: true, message: 'Campaign was deleted successfully' });
  } catch (error) {
    next(new errorClass(error.message, 401));
  }
};

const campaignTemplateHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ success: true, data: req.file.filename });
  } catch (error) {
    next(new errorClass(error.message, 401));
  }
};

const campaignCsvHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ success: true, data: req.file.filename });
  } catch (error) {
    next(new errorClass(error.message, 401));
  }
};
