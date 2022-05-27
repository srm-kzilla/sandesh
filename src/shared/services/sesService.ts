import { SESV2 } from 'aws-sdk';
import LoggerInstance from '../../loaders/logger';
import Config from '../../config/index';
import { File } from 'aws-sdk/clients/codecommit';
import { replyToAddresses } from '../constants';

const SES = new SESV2(Config.sesConfig);

export const sendMail = async (email: Array<string>, subject: string, body: string, senderEmail: string) => {
  const params = {
    Content: {
      Simple: {
        Body: {
          Html: {
            Data: body,
            Charset: 'Utf-8',
          },
          Text: {
            Data: 'Please use a HTML Client to view this email.',
            Charset: 'Utf-8',
          },
        },
        Subject: {
          Data: subject,
          Charset: 'utf-8',
        },
      },
    },
    Destination: {
      ToAddresses: [...email],
    },
    FromEmailAddress: `SRMKZILLA <${senderEmail}@srmkzilla.net>`,
    ReplyToAddresses: replyToAddresses,
  };
  try {
    await SES.sendEmail(params).promise();
  } catch (error) {
    LoggerInstance.error(error);
    throw Error(error);
  }
};
