import * as yup from 'yup';

const campaignSchema = {
  title: yup.string().required().trim(),
  mailingList: yup.string().required().trim(),
  startTime: yup.string().required().trim(),
  scheduled: yup.boolean().required(),
  subject: yup.string().required(),
  senderMail: yup.string().notRequired(),
  launchStatus: yup.boolean().default(false).notRequired(),
  fileName: yup.string().required(),
};

export const createCampaignSchema = new yup.ObjectSchema(campaignSchema);
export const updateCampaignSchema = new yup.ObjectSchema({ ...campaignSchema, id: yup.string().required().trim() });
export const deleteCampaignSchema = new yup.ObjectSchema({ property: yup.string().required().trim() });
