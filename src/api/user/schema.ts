import * as yup from 'yup';
import {userDomains,UserDesigations} from '../../shared/constants'

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
      .test('UserDomain', 'Value does not match of type UserDomain', value => {
        for (let i = 0; i < userDomains.length; i++) {
          if (value === userDomains[i]) return true;
        }
        return false;
      })
      .required()
      .trim(),
    designation: yup
      .string()
      .test('UserDesignation', 'Value does not match of type UserDesignation', value => {
        for (let i = 0; i < UserDesigations.length; i++) {
          if (value === UserDesigations[i]) return true;
        }
        return false;
      })
      .required()
      .trim(),
});