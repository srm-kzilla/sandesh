import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import { customAlphabet, urlAlphabet } from 'nanoid';
import { decryptData, encryptData } from '../../shared/services/encryptionService';

const nanoid = customAlphabet(urlAlphabet, 16);

export const generateKey = async () => {
  try {
    const newKey = encryptData(await nanoid());

    await (await database()).collection('keys').insertOne(newKey);
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Failed to generate apiKey');
  }
};

export const resetKey = async (_id: string) => {
  try {
    const newKey = encryptData(await nanoid());
    await (await database()).collection('keys').updateOne({ ' _id': _id }, { $set: { key: newKey } });
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Failed to reset key');
  }
};

export const fetchKeys = async () => {
  try {
    const keys = [];
    const encryptedKeys = await (await database()).collection('keys').find().toArray();
    encryptedKeys.forEach(function (encryptedKey) {
      keys.push(decryptData(encryptedKey));
      return keys;
    });
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Failed to get api keys');
  }
};
export const deleteKey = async (_id: string) => {
  try {
    const key = await (await database()).collection('keys').findOneAndDelete({ _id: _id });
    if (!key) throw { code: 404, message: 'key does not exist, thus cannot be deleted' };
    return key;
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Error-' + error.message);
  }
};
