import { Request, Response, Router } from 'express';
import { createUser, authUser } from './controller';
const app = Router();

export const authRouteHandler = () => {
  app.post('/login', loginHandler);
  app.post('/signup', signUpHandler);
  return app;
};

const loginHandler = async (req: Request, res: Response) => {
  try {
    const jwt = await authUser(req.body);
    res.json({ success: true, token: jwt });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const signUpHandler = async (req: Request, res: Response) => {
  try {
    await createUser(req.body);
    res.json({ success: true, message: 'User Successfully created' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
