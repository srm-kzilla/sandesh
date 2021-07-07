import database from '../../loaders/database';
import { MailingList } from '../../shared/customTypes';
import LoggerInstance from '../../loaders/logger';
import { getCurrentDateTime } from '../../shared/utilities';
import errorClass from '../../shared/error';
import { NextFunction } from 'express';
import { nextTick } from 'process';
import { ObjectId } from 'bson';

export const createMailingList = async (obj, next: NextFunction) => {
  try {
    const mailingList: MailingList = { ...obj };
    mailingList.createdOn = getCurrentDateTime();
    const result = await (await database()).collection('mailingList').findOne({ name: mailingList.name });
    if (result) next(new errorClass('Name Already Exists', 501));
    await (await database()).collection('mailingList').insertOne(mailingList);
  } catch (error) {
    LoggerInstance.error(error);
    next(new errorClass('Error in Creating New Mailing List', 501));
  }
};

export const getMailingList = async (next: NextFunction) => {
  try {
    return await (await database()).collection('mailingList').find({}).toArray();
  } catch (error) {
    LoggerInstance.error(error);
    next(new errorClass('Error in Fetching the Mailing Lists', 501));
  }
};

export const updateMailingList = async (obj, next: NextFunction) => {
  try {
    const { id, ...data } = obj;
    const mailingList: MailingList = { ...data };
    await (await database())
      .collection('mailingList')
      .replaceOne({ _id: new ObjectId(id) }, { _id: new ObjectId(id), ...mailingList });
  } catch (error) {
    LoggerInstance.error(error);
    next(new errorClass('Error in Updating the Mailing List', 501));
  }
};

export const deleteMailingList = async (id: string, next: NextFunction) => {
  try {
    const obj = await (await database()).collection('mailingList').findOne({ _id: new ObjectId(id) });
    if (obj == null) throw Error('Mailing List does not exists');
    await (await database()).collection('mailingList').deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    LoggerInstance.error(error);
    next(new errorClass('Error in Deleting the mailing List', 501));
  }
};
