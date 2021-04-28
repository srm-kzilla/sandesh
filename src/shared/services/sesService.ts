import { SESV2 } from 'aws-sdk';
import LoggerInstance from '../../loaders/logger';
import Config from '../../config/index';
import { File } from 'aws-sdk/clients/codecommit';

const SES = new SESV2(Config.sesConfig);

export const sendMail = async (email: Array<string>, subject: string, body: string, senderEmail: string) => {
  const Params = {
    Content: {
      Simple: {
        Body: {
          Html: {
            Data: body,
            Charset: 'Utf-8',
          },
          Text: {
            Data: body,
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
    // FromEmailAddress: `${senderEmail}@srmkzilla.net`,
    FromEmailAddress: `${senderEmail}@gmail.com`,
    ReplyToAddresses: ['technical@srmkzilla.net'],
  };
  try {
    await SES.sendEmail(Params).promise();
  } catch (error) {
    LoggerInstance.error(error);
    throw Error(error);
  }
};
