import { ObjectId } from 'mongodb';
import database from '../../loaders/database';
import LoggerInstance, { MailLogger } from '../../loaders/logger';
import { Campaign, MailingList } from '../../shared/customTypes';
import { getCurrentDateTime } from '../../shared/utilities';
import { sendMail } from '../../shared/services/sesService';
import { readFileSync } from 'fs';
import { join } from 'path';
import { NextFunction } from 'express';
import { scheduledCampaigns, startScheduler } from '../.././shared/scheduler';
import { generateTemplateFromString } from '../../shared/services/templateService';
import errorClass from '../../shared/error';
import csv from 'csvtojson';
import { emailBatchSize } from '../../shared/constants';
import { nanoid } from 'nanoid';

export const fetchCampaigns = async (next: NextFunction) => {
  try {
    return await (await database()).collection('campaign').find({}).toArray();
  } catch (error : any) {
    LoggerInstance.error(error);
    next(new errorClass(error.message || 'Error in getting Campaign Data', error.code || 501));
  }
};

export const createCampaign = async (body: any, next: NextFunction) => {
  try {
    const newCampaign: Campaign = { ...body };
    newCampaign.createdOn = getCurrentDateTime();
    const databaseResponse = await (await database()).collection('campaign').findOne({ title: newCampaign.title });
    if (databaseResponse !== null) throw Error('Existing campaign with same title');
    const mailList: MailingList = await (await database())
      .collection('mailingList')
      .findOne({ name: newCampaign.mailingList });

    if (mailList === null) throw Error('Mailing List is not Found');

    if (newCampaign.scheduled) {
      await (await database())
        .collection('campaign')
        .insertOne({ ...newCampaign, launchStatus: false, templateName: body.fileName, csvFileName: body.csvFileName });
      scheduledCampaigns.push({ ...newCampaign });
      await startScheduler();
      return;
    }

    const Body = readFileSync(join(__dirname, `../../shared/templates/${body.fileName}`), 'utf-8');

    if (newCampaign.dynamic) {
      const jsonArray = await csv().fromFile(join(__dirname, `../../shared/templates/${body.csvFileName}`));

      await mailList.emails.map(async (email, i) => {
        try {
          const updatedBody = generateTemplateFromString(Body, jsonArray[i]);
          await sendMail([email], newCampaign.subject, updatedBody, newCampaign.senderMail);
        } catch (error : any) {
          throw Error('Error in Generating Template');
        }
      });
    } else {
      let emailPromiseArray = [];
      let emailBatchArray = [];
      let failedEmailBatch = [];
      let successEmailBatch = [];

      while (mailList.emails.length > 0) {
        const emailBatch = mailList.emails.splice(0, emailBatchSize + 1);
        emailBatchArray.push(emailBatch);
        emailPromiseArray.push(sendMail(emailBatch, newCampaign.subject, Body, newCampaign.senderMail));
      }
      (await Promise.allSettled(emailPromiseArray)).forEach((result, index) => {
        result['status'] == 'rejected'
          ? failedEmailBatch.push(emailBatchArray[index])
          : successEmailBatch.push(emailBatchArray[index]);
      });

      if (failedEmailBatch.length != 0) {
        const uniqueID = nanoid();
        await (await database())
          .collection('failedEmails')
          .insertOne({ uniqueID: uniqueID, emailBatch: failedEmailBatch, createdAt: Math.round(Date.now() / 1000) });
        MailLogger(failedEmailBatch, false);
        return { success: false, message: 'Some email batch were failed to send', uniqueID: uniqueID };
      }
      MailLogger(successEmailBatch, true);
      await (await database())
        .collection('campaign')
        .insertOne({ ...newCampaign, launchStatus: true, templateName: body.fileName, csvFileName: body.csvFileName });
      return { success: true, message: 'Campaign was created successfully' };
    }
  } catch (error : any) {
    LoggerInstance.error(error);
    next(new errorClass(error.message ||'Error in Creating Campaign', error.code || 501));
  }
};

export const updateCampaign = async (body: any, next: NextFunction) => {
  try {
    const { id, ...tembObj } = body;
    const newCampaign: Campaign = tembObj;
    const databaseResponse = await (await database()).collection('campaign').findOne({ _id: new ObjectId(id) });
    if (databaseResponse === null) throw Error('Could not find campaign with the given id');
    const mailList = await (await database()).collection('mailingList').findOne({ name: newCampaign.mailingList });
    if (mailList === null) throw Error('Mailing List is not Found');
    await (await database())
      .collection('campaign')
      .replaceOne({ _id: new ObjectId(id) }, { ...newCampaign, _id: new ObjectId(id) });
  } catch (error : any) {
    LoggerInstance.error(error);
    next(new errorClass(error.message ||'Error in Updating Campaign', error.code || 501));
  }
};

export const deleteCampaign = async (property: string, next: NextFunction) => {
  try {
    const databaseResponse = await (await database())
      .collection('campaign')
      .findOne({ $or: [{ title: property }, { _id: new ObjectId(property) }] });
    if (databaseResponse === null) throw Error('Could not find campaign with the given id');
    await (await database())
      .collection('campaign')
      .deleteOne({ $or: [{ title: property }, { _id: new ObjectId(property) }] });
  } catch (error : any) {
    LoggerInstance.error(error);
    next(new errorClass(error.message ||'Error in Deleting Campaign', error.code || 501));
  }
};
