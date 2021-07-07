import { Request, Response, Router, NextFunction } from 'express';
import { requestValidation } from '../../shared/middlewares/validationMiddleware';
import { createMailingListSchema, updateMailingListSchema, deleteSchema } from './schema';
import { createMailingList, getMailingList, updateMailingList, deleteMailingList } from './controller';
import { authMiddleware } from '../../shared/middlewares/authMiddleware';
import errorClass from '../../shared/error';

export const mailingListHandler = (): Router => {
  const app = Router();
  app.post('/create', authMiddleware, requestValidation('body', createMailingListSchema), handelCreateMails);
  app.get('/getList', authMiddleware, handelGetMails);
  app.post('/Update', authMiddleware, requestValidation('body', updateMailingListSchema), handelUpdate);
  app.delete('/', authMiddleware, requestValidation('body', deleteSchema), handelDelete);
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

const handelUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateMailingList(req.body, next);
    res.json({ success: true, message: 'Updated the Mailing List' });
  } catch (error) {
    next(new errorClass(error.message, 401));
  }
};

const handelDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteMailingList(req.body.id, next);
    res.json({ success: true, message: 'Deleted the Mailing List' });
  } catch (error) {
    next(new errorClass(error.message, 401));
  }
};
