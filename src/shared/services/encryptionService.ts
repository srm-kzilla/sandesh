import * as CryptoJS from 'crypto-js';
import LoggerInstance from '../../loaders/logger';

const key = CryptoJS.enc.Hex.parse(process.env.API_ENCRYPTION_KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.API_ENCRYPTION_IV);

export const encryptData = (dataToBeEncrypted: string): string => {
  try {
    return CryptoJS.AES.encrypt(dataToBeEncrypted, key, { iv: iv }).toString();
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Encryption error');
  }
};

export const decryptData = (dataToBeDecrypted: string): string => {
  try {
    return CryptoJS.AES.decrypt(dataToBeDecrypted, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Encryption error');
  }
};
