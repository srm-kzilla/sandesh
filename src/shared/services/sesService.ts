import AWS from 'aws-sdk'


const configSES = {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    region: process.env.AWS_SES_REGION
};



export const sendMail=async (email: string,subject: string,body: string)=>{
    try{
        const Params={
            Source: 'abc@gmail.com',
            Destination: {
              ToAddresses: [
                email
              ]
            },
            ReplyToAddresses: [
              'abc@gmail.com',
            ],
            Message: {
              Body: {
                Html: {
                  Charset: "UTF-8",
                  Data: body
                }
              },
              Subject: {
                Charset: 'UTF-8',
                Data: subject
              }
            }
        } 
        await new AWS.SES(configSES).sendEmail(Params).promise()
    }catch(err){
         throw(err)
    }
}

  