import { ObjectId } from 'mongodb';
import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
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
import { nanoid } from 'nanoid'

export const fetchCampaigns = async (next: NextFunction) => {
  try {
    return await (await database()).collection('campaign').find({}).toArray();
  } catch (error) {
    LoggerInstance.error(error);
    next(new errorClass('Error in getting Campaign Data', 501));
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
        } catch (error) {
          throw Error('Error in Generating Template');
        }
      });
    } else {
      let emailPromiseArray = [];
      let emailBatchArray = [];
      let failedEmailBatch = [];

      while (mailList.emails.length > 0) {
        const emailBatch = mailList.emails.splice(0, emailBatchSize + 1);
        emailBatchArray.push(emailBatch);
        emailPromiseArray.push(sendMail(emailBatch, newCampaign.subject, Body, newCampaign.senderMail));
      }

      (await Promise.allSettled(emailPromiseArray)).forEach((result, index) => {
        result['status'] == 'rejected'
          ? () => {
              LoggerInstance.log({ level: 'error', label: 'Email Failed', message: emailBatchArray[index] });
              failedEmailBatch.push(emailBatchArray[index]);
            }
          : () => {
              LoggerInstance.log({
                level: 'info',
                label: 'Email Successful',
                message: 'Email sent successfully',
                defaultMeta: { email: emailBatchArray[index] },
              });
            };
      });

      if (failedEmailBatch.length != 0) {
        const uniqueID = nanoid();
        await (await database())
          .collection('failedEmailBatch')
          .insertOne({ uniqueID: uniqueID, emailBatch: failedEmailBatch, createdAt: Math.round(Date.now() / 1000) });
        return { success: false, message: 'Some email batch were failed to send', uniqueID: uniqueID };
      }
      return { success: true, message: 'Campaign was created successfully' };
    }

    await (await database())
      .collection('campaign')
      .insertOne({ ...newCampaign, launchStatus: true, templateName: body.fileName, csvFileName: body.csvFileName });
  } catch (error) {
    LoggerInstance.error(error);
    next(new errorClass('Error in Creating Campaign', 501));
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
  } catch (error) {
    LoggerInstance.error(error);
    next(new errorClass('Error in Updating Campaign', 501));
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
  } catch (error) {
    LoggerInstance.error(error);
    next(new errorClass('Error in Deleting Campaign', 501));
  }
};
