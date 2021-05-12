import { Request, Response, Router, NextFunction } from 'express';
import { requestValidation } from '../../shared/middlewares/validationMiddleware';
import { createMailingListSchema } from './schema';
import { createMailingList, getMailingList } from './controller';
import errorClass from '../../shared/error';

export const mailingListHandler = (): Router => {
  const app = Router();
  app.post('/create', handelCreateMails);
  app.get('/getList', handelGetMails);
  return app;
};

const handelCreateMails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createMailingList(req.body, next);
    res.json({ success: true, message: 'Created New Mailing List' });
  } catch (error) {
    next(new errorClass(error.message, 401));
  }
};

const handelGetMails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mailingLists = await getMailingList(next);
    res.json({ success: true, data: mailingLists });
  } catch (error) {
    next(new errorClass(error.message, 401));
  }
};
