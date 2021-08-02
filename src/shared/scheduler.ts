import { schedule } from 'node-cron';
import { readFileSync } from 'fs';
import { join } from 'path';
import LoggerInstance from '../loaders/logger';
import database from '../loaders/database';
import { sendMail } from './services/sesService';
import csv from 'csvtojson';
import { generateTemplateFromString } from './services/templateService';
export var scheduledCampaigns = [];

export const startScheduler = async () => {
  try {
    scheduledCampaigns.map(campaignData => {
      const scheduledTime = campaignData.startTime.split(' ');
      const [min, hour, day, mon, week] = scheduledTime;
      const task = schedule(`${min} ${hour} ${day} ${mon} ${week}`, async () => {
        const Body = readFileSync(join(__dirname, `./templates/${campaignData.fileName}`), 'utf-8');

        const mailingListData = await (await database())
          .collection('mailingList')
          .findOne({ name: campaignData.mailingList });

        if (campaignData.dynamic == 'true') {
          const jsonArray = await csv().fromFile(join(__dirname, `./templates/${campaignData.csvFileName}`));
          await mailingListData.emails.map(async (email, i) => {
            const updatedBody = generateTemplateFromString(Body, jsonArray[i]);
            await sendMail([email], campaignData.subject, updatedBody, campaignData.senderMail);
          });
        } else {
          await sendMail(mailingListData.emails, campaignData.subject, Body, campaignData.senderMail);
        }

        await (await database())
          .collection('campaign')
          .updateOne({ title: campaignData.title }, { $set: { launchStatus: true } });
      });

      task.start();
      removeScheduled(campaignData);
    });
  } catch (error) {
    LoggerInstance.error(error);
  }
};

export const intializeScheduler = async () => {
  try {
    const data = await (await database()).collection('campaign').find({ launchStatus: false }).toArray();
    if (data.length > 0) scheduledCampaigns = [...data];
  } catch (error) {
    LoggerInstance.error(error);
  }
};

const removeScheduled = campaignData => {
  scheduledCampaigns = scheduledCampaigns.filter(data => {
    if (data.title != campaignData.title) return data;
  });
};
