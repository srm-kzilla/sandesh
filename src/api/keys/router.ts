import { Request, Response, Router } from 'express';
import { generateKey, resetKey, toggleKey, fetchKeys, deleteKey } from './controller';
import { requestValidation } from '../../shared/middlewares/validationMiddleware';
import { keySchema, toggleKeySchema } from './schema';
import { authMiddleware } from '../../shared/middlewares/authMiddleware';

const getAllKeysHandler = async (req: Request, res: Response) => {
  try {
    const result = await fetchKeys();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(error.code).send({ success: false, message: error.message });
  }
};

const generateKeyHandler = async (req: Request, res: Response) => {
  try {
    const apiKey = await generateKey(req.body.user);
    res.json({ success: true, data: apiKey });
  } catch (error) {
    res.status(error.code).send({ success: false, message: error.message });
  }
};

const toggleKeyHandler = async (req: Request, res: Response) => {
  try {
    await toggleKey(req.params.id, req.body.isEnabled);
    res.json({ success: true, message: 'toggled key' });
  } catch (error) {
    res.status(error.code).send({ success: false, message: error.message });
  }
};

const resetKeyHandler = async (req: Request, res: Response) => {
  try {
    const newKey = await resetKey(req.params.id);
    res.json({ success: true, message: 'reset key', data: newKey });
  } catch (error) {
    res.status(error.code).send({ success: false, message: error.message });
  }
};

const deleteKeyHandler = async (req: Request, res: Response) => {
  try {
    await deleteKey(req.params.id);
    res.json({ success: true, message: 'key deleted' });
  } catch (error) {
    res.status(error.code).send({ success: false, message: error.message });
  }
};
const app = Router();
export const apiKeyRouteHandler = (): Router => {
  app.get('/', authMiddleware, getAllKeysHandler);
  app.put('/toggle/:id', authMiddleware, requestValidation('body', toggleKeySchema), toggleKeyHandler);
  app.put('/reset/:id', authMiddleware, resetKeyHandler);
  app.post('/', authMiddleware, requestValidation('body', keySchema), generateKeyHandler);
  app.delete('/:id', authMiddleware, deleteKeyHandler);
  return app;
};
