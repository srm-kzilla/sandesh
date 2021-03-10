import * as yup from 'yup';
export const keySchema = new yup.ObjectSchema({
  user: yup.string().required().trim(),
  key: new yup.ObjectSchema({
    iv: yup.string(),
    content: yup.string(),
  }),
  isEnabled: yup.boolean().default(true),
});
