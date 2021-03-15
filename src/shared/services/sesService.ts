import {SESV2} from 'aws-sdk'
import LoggerInstance from '../../loaders/logger';
import Config from '../../config/index'

const SES=new SESV2(Config.sesConfig);


export const sendMail=async (email: string,subject: string,body: string,senderEmail: string)=>{
        const Params={
          Content: { 
            Simple: {
              Body: { 
                Html: {
                  Data: body,
                  Charset: 'Utf-8'
                },
                Text: {
                  Data: body, 
                  Charset: 'Utf-8'
                }
              },
              Subject: { 
                Data: subject, 
                Charset: 'utf-8'
              }
            },
          },
          Destination: {
            ToAddresses: [
              email
            ]
          },
          FromEmailAddress: `${senderEmail}@srmkzilla.net`,
          ReplyToAddresses: [
            "technical@srmkzilla.net"
          ]
        }
      try{
        await SES.sendEmail(Params).promise();
      }catch(error)
      {
         LoggerInstance.error(error)
         throw{ code: 403, message: error}
      }   
}

  