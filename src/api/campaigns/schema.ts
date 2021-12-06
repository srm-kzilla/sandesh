import * as yup from 'yup';

const campaignSchema = {
  title: yup.string().required().trim(),
  mailingList: yup.string().required().trim(),
  startTime: yup.string().required(),
  scheduled: yup.boolean().notRequired(),
  subject: yup.string().required(),
  senderMail: yup.string().notRequired(),
  launchStatus: yup.boolean().default(false).notRequired(),
  fileName: yup.string().required(),
  csvFileName: yup.string().default('NA').required(),
  dynamic: yup.boolean().notRequired(),
};

export const createCampaignSchema = new yup.ObjectSchema(campaignSchema);
export const updateCampaignSchema = new yup.ObjectSchema({ ...campaignSchema, id: yup.string().required().trim() });
export const deleteCampaignSchema = new yup.ObjectSchema({ property: yup.string().required().trim() });
