import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import { getCurrentDateTime } from '../../shared/utilities';

export const fetchMailingList = async () => {
  try {
    return await (await database()).collection('mailing-list').find({}).toArray();
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Failed to get mailing lists');
  }
};

export const addMailingListFromJson = async (body: any) => {
  try {
    let preExisitingData = await (await database()).collection('mailing-list').findOne({ name: body.name });
    if (preExisitingData === null) {
      //TO DO: Get the username from the logged in user
      body.createdBy = 'ruddha2001';
      body.createdOn = getCurrentDateTime();
      body.lastUpdatedOn = getCurrentDateTime();
      return await (await database()).collection('mailing-list').insertOne(body);
    }
    body.receivers.forEach(element => {
      preExisitingData.receivers.push(element);
    });
    await (await database())
      .collection('mailing-list')
      .updateOne(
        { name: body.name },
        { $set: { receivers: preExisitingData.receivers, lastUpdatedOn: getCurrentDateTime() } },
      );
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Unable to add mailing list from JSON. Error - ' + error.message);
  }
};
