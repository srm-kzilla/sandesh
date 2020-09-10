import * as yup from "yup";

export const recipientSchema = yup.object({
  name: yup.string(),
  email: yup.string().email().required(),
});

export const mailRequestSchema = yup
  .object({
    html: yup.string().required(),
    text: yup.string().required(),
    subject: yup.string(),
    to: yup.array().of(recipientSchema.required()).min(1).required(),
    cc: yup.array().of(recipientSchema.required()),
    bcc: yup.array().of(recipientSchema.required()),
  })
  .required();

export type MailRequest = yup.InferType<typeof mailRequestSchema>;
