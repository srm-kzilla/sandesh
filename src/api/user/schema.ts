import * as yup from 'yup';
import {userDomains,userDesignations} from '../../shared/constants'

const userSchema = {
    email: yup.string().email().required().trim(),
    password: yup.string().required().trim(),
};
  
export const userLoginSchema = new yup.ObjectSchema(userSchema);

export const userRegisterSchema = new yup.ObjectSchema({
    ...userSchema,
    name: yup.string().required().trim(),
    domain: yup
      .string()
      .oneOf([...userDomains])
      .required()
      .trim(),
    designation: yup
      .string()
      .oneOf([...userDesignations])
      .required()
      .trim(),
});