import * as yup from 'yup';


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