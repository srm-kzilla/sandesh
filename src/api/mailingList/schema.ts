import * as yup from 'yup';

const mailingList = {
  name: yup.string().required().trim(), // Name to uniquely Identify mailing List
  emails: yup.array().of(yup.string().email()).required(), //Array of Emails
  description: yup.string().required().trim(), // String to define Mailing List
};

export const createMailingListSchema = new yup.ObjectSchema(mailingList);

export const updateMailingListSchema = new yup.ObjectSchema({ ...mailingList, id: yup.string().required().trim() });

export const deleteSchema = new yup.ObjectSchema({ id: yup.string().required().trim() });
