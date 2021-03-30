import * as yup from 'yup';


const campaignSchema = {
    title: yup.string().required().trim(),
    mailingList: yup.string().required().trim(),
    startFrom: yup.string().required().trim(),
    endAt: yup.string().required().trim(),
    isolatedEmails: yup.array().of(yup.string()).notRequired(),
};
  
export const createCampaignSchema = new yup.ObjectSchema(campaignSchema);
export const updateCampaignSchema = new yup.ObjectSchema({ ...campaignSchema, id: yup.string().required().trim() });
export const deleteCampaignSchema = new yup.ObjectSchema({ property: yup.string().required().trim() });