import {SESV2} from 'aws-sdk'
import Config from '../../config/index'

const ses=new SESV2(Config.sesConfig);


export const sendMail=async (email: string,subject: string,body: string)=>{
        const Params={
          Content: { 
            Simple: {
              Body: { 
                Html: {
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
          FromEmailAddress: 'devesh.teotia12@gmail.com',
          ReplyToAddresses: [
           'devesh.teotia12@gmail.com'
          ]
        }
      await ses.sendEmail(Params).promise();
}

  