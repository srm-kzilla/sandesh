import * as yup from 'yup';
export const keySchema = new yup.ObjectSchema({
  user: yup.string().required().trim(),
  key: new yup.ObjectSchema({
    iv: yup.string(),
    content: yup.string(),
  }),
  isEnabled: yup.boolean().default(true),
});

export const toggleKeySchema = new yup.ObjectSchema({ isEnabled: yup.boolean().required() });

export type Key = yup.InferType<typeof keySchema>;
