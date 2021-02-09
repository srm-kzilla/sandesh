import { Request, Response, Router } from 'express';
import * as yup from 'yup';
import { requestValidation } from '../../shared/middlewares/validationMiddleware';
import { createUser, userLogin } from './controller';

const userSchema = {
  email: yup.string().email().required().trim(),
  password: yup.string().required().trim(),
};

const userLoginSchema = new yup.ObjectSchema(userSchema);
const userRegisterSchema = new yup.ObjectSchema({
  ...userSchema,
  name: yup.string().required().trim(),
  domain: yup
    .string()
    .test('UserDomain', 'Value does not match of type UserDomain', value => {
      const domainArray = ['Technical', 'Sponsorship', 'Editorial', 'Events', 'Core'];
      for (let i = 0; i < domainArray.length; i++) {
        if (value === domainArray[i]) return true;
      }
      return false;
    })
    .required()
    .trim(),
  designation: yup
    .string()
    .test('UserDesignation', 'Value does not match of type UserDesignation', value => {
      const domainArray = ['Executive Board', 'CTO', 'CFO', 'Editor-in-chief', 'Lead', 'Associate Lead', 'Member'];
      for (let i = 0; i < domainArray.length; i++) {
        if (value === domainArray[i]) return true;
      }
      return false;
    })
    .required()
    .trim(),
});

const app = Router();
export const userRouteHandler = () => {
  app.post('/login', requestValidation('body', userLoginSchema), userLoginHandler);
  app.post('/register', requestValidation('body', userRegisterSchema), userRegisterHandler);
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
