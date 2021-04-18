import database from '../../loaders/database';
import { MailingList } from '../../shared/customTypes';
import LoggerInstance from '../../loaders/logger';
import { getCurrentDateTime } from '../../shared/utilities';
import errorClass from '../../shared/error';
import { NextFunction } from 'express';
import { nextTick } from 'process';

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
