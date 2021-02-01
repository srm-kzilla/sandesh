import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';

export const fetchCampaigns = async () => {
  try {
    return await (await database()).collection('campaign').find({}).toArray();
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Failed to get campaign data');
  }
};
