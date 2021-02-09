import { ObjectId } from 'mongodb';
import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import { Campaign } from '../../shared/customTypes';
import { getCurrentDateTime } from '../../shared/utilities';

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
    newCampaign.createdOn = getCurrentDateTime();
    const databaseResponse = await (await database()).collection('campaign').findOne({ title: newCampaign.title });
    if (databaseResponse !== null) throw Error('Existing campaign with same title');
    await (await database()).collection('campaign').insertOne(newCampaign);
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Unable to create a new campaign. Error - ' + error.message);
  }
};

export const updateCampaign = async (body: any) => {
  try {
    const { id, ...tembObj } = body;
    const newCampaign: Campaign = tembObj;
    const databaseResponse = await (await database()).collection('campaign').findOne({ _id: new ObjectId(id) });
    if (databaseResponse === null) throw Error('Could not find campaign with the given id');
    await (await database())
      .collection('campaign')
      .replaceOne({ _id: new ObjectId(id) }, { ...newCampaign, _id: new ObjectId(id) });
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Unable to update campaign. Error - ' + error.message);
  }
};

export const deleteCampaign = async (property: string) => {
  try {
    const databaseResponse = await (await database())
      .collection('campaign')
      .findOne({ $or: [{ title: property }, { _id: new ObjectId(property) }] });
    if (databaseResponse === null) throw Error('Could not find campaign with the given id');
    await (await database())
      .collection('campaign')
      .deleteOne({ $or: [{ title: property }, { _id: new ObjectId(property) }] });
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Unable to delete campaign. Error - ' + error.message);
  }
};
