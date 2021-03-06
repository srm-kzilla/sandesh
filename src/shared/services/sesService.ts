import {SESV2} from 'aws-sdk'
const configSES = {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    region: process.env.AWS_SES_REGION
};
const ses=new SESV2(configSES);


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

  