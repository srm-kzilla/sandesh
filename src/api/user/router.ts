import { Request, Response, Router } from 'express';
import { requestValidation } from '../../shared/middlewares/validationMiddleware';
import { createUser, userLogin } from './controller';
import { userLoginSchema, userRegisterSchema } from './schema';

const app = Router();
export const userRouteHandler = () => {
  app.post('/login', requestValidation('body', userLoginSchema), userLoginHandler);
  // app.post('/register', requestValidation('body', userRegisterSchema), userRegisterHandler);
  return app;
};

const userLoginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const jwt = await userLogin(email, password);
    res.json({ success: true, token: jwt });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const userRegisterHandler = async (req: Request, res: Response) => {
  try {
    const { name, domain, designation, email, password } = req.body;
    await createUser(name, domain, designation, email, password);
    res.json({ success: true, message: 'User successfully created' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
