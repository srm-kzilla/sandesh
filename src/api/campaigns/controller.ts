import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import { Campaign } from '../../shared/customTypes';

export const fetchCampaigns = async () => {
  try {
    return await (await database()).collection('campaign').find({}).toArray();
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Failed to get campaign data');
  }
};

export const createCampaign = async (body: any) => {
  try {
    const newCampaign: Campaign = { ...body };
    const databaseResponse = await (await database()).collection('compaign').findOne({ title: newCampaign.title });
    if (databaseResponse !== undefined) throw 'Existing campaign with same title';
    await (await database()).collection('campaign').insertOne(newCampaign);
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Unable to create a new campaign');
  }
};
