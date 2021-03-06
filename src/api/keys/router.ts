import { Request, Response, Router } from 'express';
import { generateKey, resetKey, fetchKeys, deleteKey } from './controller';

const getAllKeysHandler = async (req: Request, res: Response) => {
  try {
    const result = await fetchKeys();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(error.code).send({ success: false, message: error.message });
  }
};

const generateKeyHandler = async (req: Request, res: Response) => {
  try {
    const apiKey = await generateKey();
    res.status(200).json({ data: apiKey });
  } catch (error) {
    res.status(error.code).send({ success: false, message: error.message });
  }
};

const resetKeyHandler = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    await resetKey(_id);
    res.json({ success: true, message: 'user updated' });
  } catch (error) {
    if (error.code) return res.status(error.code).send({ success: false, message: error.message });
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteKeyHandler = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    await deleteKey(_id);
    res.json({ success: true, message: 'key deleted' });
  } catch (error) {
    if (error.code) {
      return res.status(error.code).send({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
const app = Router();
export const apiKeyRouteHandler = () => {
  app.get('/', getAllKeysHandler);
  app.patch('/:_id', resetKeyHandler);
  app.post('/', generateKeyHandler);
  app.delete('/:_id', deleteKeyHandler);
  return app;
};
