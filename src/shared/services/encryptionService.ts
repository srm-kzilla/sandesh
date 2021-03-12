import * as crypto from 'crypto';
import LoggerInstance from '../../loaders/logger';
import { Decipher } from '../customTypes';

const algorithm = 'aes-256-ctr';
const secretKey = process.env.ENCRYPTION_KEY;
const iv = crypto.randomBytes(16);

export const encryptData = (dataToBeEncrypted: string): Decipher => {
  try {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(dataToBeEncrypted), cipher.final()]);

    return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex'),
    };
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('encryption error-' + error);
  }
};

export const decryptData = (dataToBeDecrypted: Decipher): string => {
  try {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(dataToBeDecrypted.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(dataToBeDecrypted.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('encryption error');
  }
};
