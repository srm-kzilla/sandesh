import { Request, Response, Router } from 'express';
import { addMailingListFromJson, fetchMailingList } from './controller';

const app = Router();
export const mailingListRouteHandler = () => {
  app.get('/', fetchMailingListHandler);
  app.post('/json', addMailingListFromJsonHandler);
  return app;
};

const fetchMailingListHandler = async (req: Request, res: Response) => {
  try {
    res.json(await fetchMailingList());
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const addMailingListFromJsonHandler = async (req: Request, res: Response) => {
  try {
    await addMailingListFromJson(req.body);
    res.json({ success: true, message: 'New mailing list has been added' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
